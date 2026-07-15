// Datos maestros del registro de pintura.
// Organización de categorías del árbol de fallas: criterio propuesto para
// hacer usable un desplegable en cascada — ajustable si no coincide con
// cómo lo pensás vos.

window.CAUSAS = {
  "Falla Automatización": [
    "Fuera de secuencia", "PLC", "Módulo de entradas", "Módulo de salidas",
    "Red industrial", "HMI", "Encoder", "Sensor inductivo",
    "Sensor fotoeléctrico", "Fin de carrera", "Pérdida de parámetros",
  ],
  "Falla Eléctrica": [
    "Variador de frecuencia", "Motor principal", "Contactor", "Relé térmico",
    "Fuente de alimentación", "Corte de energía", "Cortocircuito",
    "Cableado defectuoso", "Tablero eléctrico",
  ],
  "Falla Seguridades": [
    "Barrera fotoeléctrica", "Cerradura de puerta", "Rotura de protecciones",
    "Botoneras / paradas de emergencia / bimanuales",
  ],
  "Falla Hidráulica": [
    "Filtro tapado", "Aceite contaminado", "Sobrecalentamiento de aceite",
    "Bomba hidráulica averiada", "Válvula defectuosa / trabada",
    "Cilindro con fuga", "Rotura de manguera", "Ingreso de aire al circuito",
    "Presión baja",
  ],
  "Falla Neumática": [
    "Electroválvula", "Cilindro neumático", "Regulador de presión",
    "Filtro saturado", "Secador de aire", "Compresor sin servicio",
    "Racor dañado",
  ],
  "Falla Alimentador": [
    "Desalineación de fleje", "Fleje fuera de medida",
  ],
  "Falla Mecánica / Prensa": [
    "Falla desbobinador", "Falla guías de prensa", "Falla embrague / freno",
    "Vibración excesiva de prensa",
  ],
  "Paradas Programadas / Gestión": [
    "Parada programada", "Equipo no operativo (se genera MP)", "TPM",
    "Falta operario", "Set up cambio de modelo", "Otros",
  ],
  "Calidad / Proceso": [
    "Rebordeado defectuoso", "Fuera de dimensional materia prima",
    "Punzonado NOK", "Defectos de rebordeado", "Defectos de punzonado",
    "Defectos de superficie", "Materia prima no conforme",
    "Capacidad del proceso insuficiente / fuera de STD",
    "Tiempo de ciclo fuera de objetivo", "Desviación de set up",
    "Falta de estándar",
  ],
  "Materiales / Logística": [
    "Espera cambio de materia prima", "Espera autoelevador",
    "Falta repuestos", "Rack lleno",
  ],
  "Herramental / Mantenimiento": [
    "Revisión luz de rodillos", "Cambio de herramientas",
    "HTE desactualizada", "HP de parámetros desactualizada",
    "Rotura de punzón", "Rotura de matriz", "Desgaste de punzón",
    "Desgaste de matriz", "Desalineación de herramental",
    "Rotura de resorte", "Falta de mantenimiento de matriz",
    "Herramental fuera de STD",
  ],
};

// Modelos por línea (puramente descriptivo, no afecta el cálculo del PLAN)
window.MODELOS = {
  Camisas: ["120 LITROS", "90 LITROS", "80 LITROS", "55 LITROS", "45 LITROS"],
  Omera: ["TAPA GAS", "PISO GAS", "TAPA SUPERIOR ELECTRICO", "TAPA INFERIOR ELECTRICO", "TAPA GEISER", "PISO GEISER"],
};

// Franjas horarias estándar de un turno
window.FRANJAS_HORARIAS = [
  "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00",
  "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00",
  "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00",
  "21:00-22:00", "22:00-23:00", "23:00-23:30",
];

// Tasa base de producción por línea
window.TASA_BASE = {
  Camisas: { 1: 70, 2: 85 },
  Omera: { 1: 160 },
};

// Factor de disponibilidad por evento — Desayuno es la única celda que
// difiere entre líneas (en Camisas se releva al operario, en Ómera no).
window.FACTORES = {
  Normal: { Camisas: 1.0, Omera: 1.0 },
  "Reunión inicio turno (10 min)": { Camisas: 0.83, Omera: 0.83 },
  "Limpieza fin turno (10 min)": { Camisas: 0.83, Omera: 0.83 },
  "Almuerzo (30 min)": { Camisas: 0.5, Omera: 0.5 },
  "Desayuno (15 min)": { Camisas: 1.0, Omera: 0.75 },
};
