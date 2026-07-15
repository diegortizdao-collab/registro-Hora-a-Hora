<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registro Hora a Hora — Pintura</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="app">

  <header class="app-header">
    <div>
      <h1>Registro Hora a Hora — Pintura</h1>
      <p class="subtitle">Camisas / Ómera — carga diaria y consulta histórica</p>
    </div>
    <div class="logo-badge"><img src="assets/escorial-logo.png" alt="Escorial"></div>
  </header>

  <nav class="tabs" id="tabs">
    <button class="tab active" data-tab="cargar">Cargar</button>
    <button class="tab" data-tab="consultar">Consultar</button>
  </nav>

  <main class="panels">

    <!-- CARGAR -->
    <section class="panel active" id="panel-cargar">
      <div id="configWarning" class="warning-box" style="display:none">
        ⚠️ Falta configurar la conexión a la base de datos en <code>config.js</code>. El formulario no va a poder guardar hasta que eso esté completo.
      </div>

      <h2>Nuevo registro</h2>
      <div class="grid-3">
        <label>Línea
          <select id="f-linea">
            <option value="Camisas">Camisas</option>
            <option value="Omera">Ómera</option>
          </select>
        </label>
        <label>Fecha (día que se produjo)
          <input type="date" id="f-fecha">
        </label>
        <label>Franja horaria
          <select id="f-hora"></select>
        </label>
      </div>

      <div class="grid-3">
        <label>Modelo
          <select id="f-modelo"></select>
        </label>
        <label id="f-operarios-wrap">Operarios
          <select id="f-operarios">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <label>Evento / disponibilidad
          <select id="f-evento"></select>
        </label>
      </div>

      <div class="grid-3">
        <label>PLAN (calculado)
          <input type="text" id="f-plan" readonly>
        </label>
        <label>REAL producido
          <input type="number" id="f-real" min="0" step="1">
        </label>
        <label>OA (calculado)
          <input type="text" id="f-oa" readonly>
        </label>
      </div>

      <div id="causaWrap" class="grid-2" style="display:none">
        <label>Categoría de falla
          <select id="f-causa-cat"></select>
        </label>
        <label>Subcausa
          <select id="f-causa-sub"></select>
        </label>
      </div>

      <div class="grid-2">
        <label>Turno / operador (opcional)
          <input type="text" id="f-turno" placeholder="Ej: Turno mañana - Juan P.">
        </label>
      </div>

      <button class="btn btn-primary" id="btnGuardar">Guardar registro</button>
      <span id="guardarStatus" class="hint"></span>
    </section>

    <!-- CONSULTAR -->
    <section class="panel" id="panel-consultar">
      <h2>Historial</h2>
      <div class="grid-3">
        <label>Desde
          <input type="date" id="q-desde">
        </label>
        <label>Hasta
          <input type="date" id="q-hasta">
        </label>
        <label>Línea
          <select id="q-linea">
            <option value="">Todas</option>
            <option value="Camisas">Camisas</option>
            <option value="Omera">Ómera</option>
          </select>
        </label>
      </div>
      <button class="btn btn-add" id="btnBuscar">Buscar</button>
      <button class="btn btn-export" id="btnExportar">Exportar a Excel</button>

      <div id="resumenBox" class="resumen-box" style="display:none">
        <div><span class="resumen-label">Registros</span><span id="r-count" class="resumen-value">-</span></div>
        <div><span class="resumen-label">Total REAL</span><span id="r-total" class="resumen-value">-</span></div>
        <div><span class="resumen-label">OA promedio</span><span id="r-oa" class="resumen-value">-</span></div>
      </div>

      <div id="causasFrecuentes"></div>

      <div class="table-wrap">
        <table id="resultTable">
          <thead>
            <tr><th>Fecha</th><th>Línea</th><th>Hora</th><th>Modelo</th><th>Plan</th><th>Real</th><th>OA</th><th>Causa</th><th>Turno</th><th></th></tr>
          </thead>
          <tbody id="resultBody"></tbody>
        </table>
      </div>
    </section>

  </main>

  <footer class="app-footer"><span id="statusMsg"></span></footer>
</div>

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="config.js"></script>
<script src="data.js"></script>
<script src="app.js"></script>
</body>
</html>
