/* ============================================================
   Registro Hora a Hora — Pintura (Camisas / Ómera)
   ============================================================ */

let supabaseClient = null;
(function initSupabase() {
  const cfg = window.SUPABASE_CONFIG || {};
  const ready = cfg.SUPABASE_URL && !cfg.SUPABASE_URL.startsWith("PEGAR_ACA")
    && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_ANON_KEY.startsWith("PEGAR_ACA");
  if (!ready) {
    document.getElementById("configWarning").style.display = "block";
    return;
  }
  supabaseClient = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
})();

// ---------------- TABS ----------------
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("panel-" + btn.dataset.tab).classList.add("active");
  });
});

// ---------------- POBLAR SELECTS FIJOS ----------------
function fillSelect(el, options) {
  el.innerHTML = "";
  options.forEach((opt) => {
    const o = document.createElement("option");
    o.value = opt; o.textContent = opt;
    el.appendChild(o);
  });
}

const elLinea = document.getElementById("f-linea");
const elFecha = document.getElementById("f-fecha");
const elHora = document.getElementById("f-hora");
const elModelo = document.getElementById("f-modelo");
const elOperariosWrap = document.getElementById("f-operarios-wrap");
const elOperarios = document.getElementById("f-operarios");
const elEvento = document.getElementById("f-evento");
const elPlan = document.getElementById("f-plan");
const elReal = document.getElementById("f-real");
const elOa = document.getElementById("f-oa");
const elCausaWrap = document.getElementById("causaWrap");
const elCausaCat = document.getElementById("f-causa-cat");
const elCausaSub = document.getElementById("f-causa-sub");

fillSelect(elHora, window.FRANJAS_HORARIAS);
fillSelect(elEvento, Object.keys(window.FACTORES));
fillSelect(elCausaCat, Object.keys(window.CAUSAS));

// Fecha por defecto: ayer (el pizarrón se carga al día siguiente de producido)
(function setDefaultDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  elFecha.value = d.toISOString().slice(0, 10);
})();

function refreshModelos() {
  fillSelect(elModelo, window.MODELOS[elLinea.value]);
}
function refreshOperariosVisibility() {
  // Ómera trabaja siempre con una sola persona: se oculta el selector.
  elOperariosWrap.style.display = elLinea.value === "Omera" ? "none" : "flex";
}
function refreshCausaSub() {
  fillSelect(elCausaSub, window.CAUSAS[elCausaCat.value] || []);
}

refreshModelos();
refreshOperariosVisibility();
refreshCausaSub();

elLinea.addEventListener("change", () => {
  refreshModelos();
  refreshOperariosVisibility();
  recalcular();
});
elCausaCat.addEventListener("change", refreshCausaSub);

// ---------------- CALCULO PLAN / OA ----------------
function recalcular() {
  const linea = elLinea.value;
  const operarios = linea === "Omera" ? 1 : Number(elOperarios.value);
  const tasaBase = window.TASA_BASE[linea][operarios];
  const factor = (window.FACTORES[elEvento.value] || {})[linea] ?? 1;
  const plan = tasaBase * factor;
  elPlan.value = plan.toFixed(1);

  const real = elReal.value === "" ? null : Number(elReal.value);
  if (real !== null && plan > 0) {
    const oa = real / plan;
    elOa.value = (oa * 100).toFixed(1) + "%";
    elCausaWrap.style.display = real < plan ? "grid" : "none";
  } else {
    elOa.value = "";
    elCausaWrap.style.display = "none";
  }
}
[elOperarios, elEvento, elReal].forEach((el) => el.addEventListener("input", recalcular));
recalcular();

// ---------------- GUARDAR ----------------
document.getElementById("btnGuardar").addEventListener("click", async () => {
  const statusEl = document.getElementById("guardarStatus");
  if (!supabaseClient) {
    alert("Falta configurar config.js con los datos de tu proyecto Supabase.");
    return;
  }
  const linea = elLinea.value;
  const plan = Number(elPlan.value);
  const real = elReal.value === "" ? null : Number(elReal.value);

  if (real !== null && real < plan && !elCausaSub.value) {
    alert("El REAL cargado es menor al PLAN — seleccioná una causa de pérdida antes de guardar.");
    return;
  }

  const registro = {
    fecha: elFecha.value,
    linea,
    hora: elHora.value,
    modelo: elModelo.value,
    operarios: linea === "Omera" ? 1 : Number(elOperarios.value),
    factor_disponibilidad: (window.FACTORES[elEvento.value] || {})[linea] ?? 1,
    plan,
    real,
    oa: real !== null && plan > 0 ? real / plan : null,
    causa_categoria: elCausaWrap.style.display !== "none" ? elCausaCat.value : null,
    causa_subcausa: elCausaWrap.style.display !== "none" ? elCausaSub.value : null,
    turno_operador: document.getElementById("f-turno").value || null,
  };

  statusEl.textContent = "Guardando...";
  const { error } = await supabaseClient.from("registro_pintura").insert(registro);
  if (error) {
    statusEl.textContent = "";
    alert("Error al guardar: " + error.message);
    return;
  }
  statusEl.textContent = "Guardado " + new Date().toLocaleTimeString();
  elReal.value = "";
  elOa.value = "";
  elCausaWrap.style.display = "none";
  document.getElementById("f-turno").value = "";
});

// ---------------- CONSULTAR ----------------
document.getElementById("btnExportar").addEventListener("click", () => {
  if (!ultimosResultados.length) {
    alert("Primero hacé una búsqueda — se exporta lo que esté mostrando la tabla.");
    return;
  }
  const filas = ultimosResultados.map((r) => ({
    Fecha: r.fecha,
    Línea: r.linea,
    Hora: r.hora,
    Modelo: r.modelo || "",
    Operarios: r.operarios ?? "",
    "Factor disponibilidad": r.factor_disponibilidad ?? "",
    Plan: r.plan ?? "",
    Real: r.real ?? "",
    "OA (%)": r.oa !== null && r.oa !== undefined ? Math.round(r.oa * 1000) / 10 : "",
    "Categoría de falla": r.causa_categoria || "",
    Subcausa: r.causa_subcausa || "",
    "Turno / operador": r.turno_operador || "",
  }));
  const ws = XLSX.utils.json_to_sheet(filas);
  ws["!cols"] = [
    { wch: 11 }, { wch: 9 }, { wch: 13 }, { wch: 16 }, { wch: 10 }, { wch: 12 },
    { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 22 }, { wch: 26 }, { wch: 20 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Registro Pintura");

  const desde = document.getElementById("q-desde").value || "todo";
  const hasta = document.getElementById("q-hasta").value || "todo";
  XLSX.writeFile(wb, `registro_pintura_${desde}_a_${hasta}.xlsx`);
});

document.getElementById("btnBuscar").addEventListener("click", async () => {
  if (!supabaseClient) {
    alert("Falta configurar config.js con los datos de tu proyecto Supabase.");
    return;
  }
  const desde = document.getElementById("q-desde").value;
  const hasta = document.getElementById("q-hasta").value;
  const linea = document.getElementById("q-linea").value;

  let query = supabaseClient.from("registro_pintura").select("*").order("fecha", { ascending: false }).order("hora", { ascending: true });
  if (desde) query = query.gte("fecha", desde);
  if (hasta) query = query.lte("fecha", hasta);
  if (linea) query = query.eq("linea", linea);

  const { data, error } = await query;
  if (error) {
    alert("Error al consultar: " + error.message);
    return;
  }
  renderResultados(data || []);
});

let ultimosResultados = [];

function renderResultados(rows) {
  ultimosResultados = rows;
  const body = document.getElementById("resultBody");
  body.innerHTML = "";
  rows.forEach((r) => {
    const tr = document.createElement("tr");
    const oaPct = r.oa !== null && r.oa !== undefined ? (r.oa * 100).toFixed(0) + "%" : "-";
    const oaClass = r.oa !== null && r.oa < 0.8 ? "oa-low" : r.oa !== null && r.oa >= 1 ? "oa-ok" : "";
    const causa = r.causa_categoria ? r.causa_categoria + " / " + r.causa_subcausa : "-";
    tr.innerHTML = `<td>${r.fecha}</td><td>${r.linea}</td><td>${r.hora}</td><td>${r.modelo || "-"}</td>` +
      `<td>${r.plan ?? "-"}</td><td>${r.real ?? "-"}</td><td class="${oaClass}">${oaPct}</td>` +
      `<td>${causa}</td><td>${r.turno_operador || "-"}</td>` +
      `<td><button class="btn-delete" data-id="${r.id}">Borrar</button></td>`;
    body.appendChild(tr);
  });

  body.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!confirm("¿Borrar este registro? No se puede deshacer.")) return;
      const { error } = await supabaseClient.from("registro_pintura").delete().eq("id", id);
      if (error) {
        alert("Error al borrar: " + error.message);
        return;
      }
      document.getElementById("btnBuscar").click();
    });
  });

  const resumenBox = document.getElementById("resumenBox");
  if (rows.length === 0) {
    resumenBox.style.display = "none";
    document.getElementById("causasFrecuentes").innerHTML = "<p class='hint'>Sin registros para ese filtro.</p>";
    return;
  }
  resumenBox.style.display = "flex";
  const withOa = rows.filter((r) => r.oa !== null && r.oa !== undefined);
  const oaProm = withOa.length ? (withOa.reduce((a, r) => a + r.oa, 0) / withOa.length) * 100 : null;
  const totalReal = rows.reduce((a, r) => a + (Number(r.real) || 0), 0);
  document.getElementById("r-count").textContent = rows.length;
  document.getElementById("r-total").textContent = totalReal;
  document.getElementById("r-oa").textContent = oaProm !== null ? oaProm.toFixed(1) + "%" : "-";

  const causaCounts = {};
  rows.forEach((r) => {
    if (!r.causa_subcausa) return;
    const key = r.causa_categoria + " / " + r.causa_subcausa;
    causaCounts[key] = (causaCounts[key] || 0) + 1;
  });
  const top = Object.entries(causaCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const causasEl = document.getElementById("causasFrecuentes");
  if (top.length) {
    causasEl.innerHTML = "<b>Causas más frecuentes en el período:</b> " +
      top.map(([k, c]) => `${k} (${c})`).join("  ·  ");
  } else {
    causasEl.innerHTML = "";
  }
}
