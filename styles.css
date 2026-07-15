# Registro Hora a Hora — Pintura (Camisas / Ómera)

App web con base de datos compartida (Supabase) para reemplazar el copy-paste manual
del pizarrón hacia la planilla acumulada. Cualquier turno, desde cualquier dispositivo,
carga sus horas y todo queda en una única base consultable.

## 1. Completar la conexión a Supabase

Editá `config.js` y pegá tus datos reales (Settings → API en tu proyecto Supabase):

```js
window.SUPABASE_CONFIG = {
  SUPABASE_URL: "https://tuproyecto.supabase.co",
  SUPABASE_ANON_KEY: "tu-anon-key-larga",
};
```

Mientras esos valores tengan el texto `PEGAR_ACA...`, la app muestra un aviso y no deja guardar ni consultar.

## 2. Crear la tabla (una sola vez)

En Supabase → SQL Editor, correr:

```sql
create table registro_pintura (
  id bigint generated always as identity primary key,
  fecha date not null,
  linea text not null check (linea in ('Camisas', 'Omera')),
  hora text not null,
  modelo text,
  operarios int,
  factor_disponibilidad numeric not null default 1,
  plan numeric,
  real numeric,
  oa numeric,
  causa_categoria text,
  causa_subcausa text,
  turno_operador text,
  creado_en timestamptz not null default now()
);

alter table registro_pintura enable row level security;

create policy "acceso_anonimo_total" on registro_pintura
  for all using (true) with check (true);
```

## 3. Publicar en GitHub Pages

Mismo procedimiento que la app de gestión mensual: subís `index.html`, `app.js`,
`styles.css`, `data.js` y `config.js` a un repo (puede ser este mismo u otro nuevo),
activás Pages en Settings, y listo.

**Importante:** `config.js` con tu key queda visible en un repo público — la `anon key`
está diseñada para eso (es pública por definición, la protección real la da la política
de la tabla en Supabase), pero si en algún momento agregás autenticación de usuarios,
ahí sí conviene revisar qué se expone.

## 4. Cómo funciona el cálculo de PLAN

```
PLAN = Tasa base (según línea y operarios) × Factor de disponibilidad (según evento)
```

| Línea | Operarios | Tasa base |
|---|---|---|
| Camisas | 1 | 70/h |
| Camisas | 2 | 85/h |
| Ómera | 1 (fijo) | 160/h |

| Evento | Factor |
|---|---|
| Normal | 1.0 |
| Reunión inicio turno (10 min) | 0.83 |
| Limpieza fin turno (10 min) | 0.83 |
| Almuerzo (30 min) | 0.5 |
| Desayuno (15 min) — Camisas (se releva al operario) | 1.0 |
| Desayuno (15 min) — Ómera (sin relevo) | 0.75 |

Todo esto está centralizado en `data.js` (`TASA_BASE`, `FACTORES`) — para ajustar un
valor no hace falta tocar `app.js`.

## 5. Árbol de causas de pérdida

También vive en `data.js` (`CAUSAS`), agrupado en categorías para el desplegable en
cascada. Si un ítem quedó mal categorizado o falta uno nuevo, se edita ahí directamente
— es un objeto JS simple, categoría → lista de subcausas.

Cuando el REAL cargado es menor al PLAN, el formulario exige elegir una causa antes
de guardar.

## 6. Multi-dispositivo

Como la base vive en Supabase (no en el navegador), varios turnos pueden cargar desde
distintos equipos y todos ven los mismos datos acumulados al instante — a diferencia
de la app de gestión mensual, que guarda todo local a cada dispositivo.
