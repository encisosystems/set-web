const historyMock = [
  {
    date: new Date().toLocaleDateString(),
    smart: false,
    estimation: {
      tasks: [
        {
          task: "No es posible estimar la tarea debido a que no cumple con el estándar SMART, el cual establece que una tarea debe ser:",
          estimated_hours: 0,
        },
        {
          task: "Específica (Specific): La tarea debe tener un objetivo claro y definido.",
          estimated_hours: 0,
        },
        {
          task: "Medible (Measurable): Debe existir una forma de medir el progreso y el éxito de la tarea.",
          estimated_hours: 0,
        },
        {
          task: "Alcanzable (Achievable): La tarea necesita ser realista.",
          estimated_hours: 0,
        },
        {
          task: "Relevante (Relevant): Debe contribuir directamente a objetivos principales.",
          estimated_hours: 0,
        },
        {
          task: "Temporalmente definida (Time-bound): La tarea debe tener un plazo o fecha límite clara.",
          estimated_hours: 0,
        },
      ],
    },
  },
  {
    date: new Date().toLocaleDateString(),
    smart: true,
    estimation: {
      tasks: [
        {
          task: "Diseño de la página web",
          estimated_hours: 20,
        },
        {
          task: "Desarrollo del backend",
          estimated_hours: 40,
        },
        {
          task: "Desarrollo del frontend",
          estimated_hours: 30,
        },
        {
          task: "Integración de API de eventos",
          estimated_hours: 10,
        },
        {
          task: "Pruebas y correcciones",
          estimated_hours: 15,
        },
      ],
    },
  },
];

export const fetchHistory = async (idUser) => {
  try {
    return historyMock;
  } catch (error) {
    console.error("Error fetching estimations:", error);
    throw new Error("Error fetching estimations");
  }
};
