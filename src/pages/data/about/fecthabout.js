export const fecthAbout = () => {
  return [

    {
      name: "Cristian Infante - Coordinador del Proyecto",
      description:
        "Administrador de la app con acceso privilegiado y control total sobre todas las funcionalidades de la aplicación. Encargado del seguimiento y cumplimiento de la metodología de desarrollo. Ademas es el encargado de verificar que las tareas estén acordes con los requisitos del proyecto y de aprobar las actividades.",
      enviroment: "backend"
    },
    {
      name: "Camila Álvarez",
      description:
        "Implementación de un servicio de traducciones para mejorar la usabilidad, accesibilidad e internacionalización de la aplicación. Este servicio permite mostrar el contenido en el idioma seleccionado por el usuario, lo que implica la realización de traducciones dinámicas del texto en la aplicación.",
      enviroment: "backend"
    },
    {
      name: "Fabricio Caicedo",
      description:
        "Integró la centralización y gestión de variables de entorno en el backend de la aplicación, asegurando una configuración coherente y segura. También integró Docker Compose para facilitar la administración de los componentes de la aplicación en entornos de trabajo. Además, implementó alertas de errores en la aplicación backend, proporcionando un mecanismo para detectar y abordar problemas de manera oportuna.",
      enviroment: "backend"
    },
    {
      name: "Gabriel Castellano",
      description:
        "Implementó un límite de tiempo en la espera de respuesta de la API para evitar el error controlado (No response from OpenAI).",
      enviroment: "backend"
    },
    {
      name: "Andrés Cruz",
      description:
        "Se encargó de desarrollar la API para el registro e inicio de sesión de usuarios. Además, diseñó y creó las tablas necesarias para almacenar la información básica del usuario, junto con el historial de consultas realizadas en el sitio.",
      enviroment: "backend"
    },
    {
      name: "Javier Charry",
      description:
        "Responsable de desarrollar el sistema de traducciones. Diseñó y creó la estructura de la base de datos que almacena todas las traducciones, cada una identificada por un ID único. Esta tabla contiene la clave única, el idioma correspondiente y el valor traducido de cada elemento. Además, implementó consultas SQL para garantizar la integridad y eficiencia del sistema, permitiendo así la fácil recuperación y manipulación de los datos.",
      enviroment: "backend"
    },
    {
      name: "Orión Guevara",
      description:
        "Contribuyó al proceso de estimación del tiempo de desarrollo de la aplicación al agregar un apartado en el prompt que permite seleccionar el seniority level garantizando una estimación precisa del tiempo requerido para completar las tareas.",
      enviroment: "backend"
    },
    {
      name: "Alan Herrera",
      description:
        "Implementó un patrón de arquitectura en el código de la aplicación web. Este patrón asegura una mejor mantenibilidad y escalabilidad del proyecto, permitiendo una gestión más eficiente del código y facilitando su expansión en el futuro.",
      enviroment: "backend"
    },
    {
      name: "Henry Martínez",
      description:
        "Implementación de un mecanismo de seguridad para los endpoints del backend, utilizando un sistema de autenticación basado en tokens JWT. Además, diseñó e implementó un sistema de autorización para los tokens JWT, garantizando que la aplicación valide la autenticidad de los tokens y permita el acceso a los servicios del backend solo a usuarios previamente autenticados. También se encargó de parametrizar los usuarios autorizados para generar tokens de autenticación.",
      enviroment: "backend"
    },
    {
      name: "Anderson Martínez",
      description:
        "API para guardar y consultar encuestas de evaluación. Este API facilita la recopilación de información cualitativa de los usuarios.",
      enviroment: "backend"
    },
    {
      name: "Johan Molina",
      description:
        "Implementó una función que asegura que la aplicación responda en el idioma configurado, mejorando la accesibilidad para usuarios de diferentes regiones. Además, diseñó la interfaz para que registre todas las consultas realizadas durante la sesión, facilitando a los usuarios acceder a su historial de actividades.",
      enviroment: "backend"
    },
    {
      name: "Camila Murillo",
      description:
        "Implementación de un sistema de sugerencias dentro de SET que evalúa los objetivos ingresados por los usuarios para determinar si cumplen con los criterios SMART, mejorando la experiencia del usuario al brindar orientación y apoyo para la formulación efectiva de objetivos.",
      enviroment: "backend"
    },
    {
      name: "Jhon Ochoa",
      description:
        "Responsable de implementar la capacidad del sistema para ajustar las respuestas proporcionadas por el API de OpenAI. Además, desarrolló la funcionalidad para gestionar registros que permiten visualizar eventos relevantes durante la ejecución del programa en el servidor de backend.",
      enviroment: "backend"
    },
    {
      name: "Oscar Páez",
      description:
        "Se encargó de establecer la conexión con el motor de base de datos MySQL y de implementar el almacenamiento de las consultas y resultados de la operación del sistema. Además, desarrolló un sistema para registrar auditorías por software de las solicitudes realizadas en el sistema.",
      enviroment: "backend"
    },
    {
      name: "Brayan Rojas",
      description:
        "Implementó el envío de un prompt al backend que permita a ChatGPT generar una sugerencia de tipo SMART de acuerdo a la tarea ingresada.",
      enviroment: "backend"
    },
    {
      name: "Javier Enciso - Director del Proyecto ",
      description:
        "Encargado de la toma de decisiones estratégicas respecto al proyecto y asignación de tareas a los equipos de trabajo.",
      enviroment: "backend"
    },
    {
      name: "Cristian Infante - Coordinador del Proyecto",
      description:
        "Administrador de la app con acceso privilegiado y control total sobre todas las funcionalidades de la aplicación. Encargado del seguimiento y cumplimiento de la metodología de desarrollo. Ademas es el encargado de verificar que las tareas estén acordes con los requisitos del proyecto y de aprobar las actividades.",
      enviroment: "frontend"
    },
    {
      name: "Camila Álvarez",
      description:
        "Integró un Throbber o ícono de carga, proporcionando a los usuarios una indicación visual clara de que la información se está cargando. Además, implementó un botón de reset del campo de texto.",
      enviroment: "frontend"
    },
    {
      name: "Gabriel Castellano",
      description:
        "Responsable de establecer un registro de log de errores durante la ejecución de la aplicación.",
      enviroment: "frontend"
    },
    {
      name: "Andrés Cruz",
      description:
        "Integró la vista encargada de cargar el formulario para el inicio de sesión y registro de usuarios en la aplicación web, proporcionando a los usuarios una interfaz intuitiva y eficiente para ingresar al sistema.",
      enviroment: "frontend"
    },
    {
      name: "Orión Guevara",
      description:
        "Responsable de implementar una lista en la interfaz web que muestra los diferentes tipos de seniority level, facilitando la selección del nivel apropiado al ingresar la descripción de la tarea y recibir una respuesta precisa.",
      enviroment: "frontend"
    },
    {
      name: "Alan Herrera",
      description:
        "Agregó la visualización del historial de consultas realizadas por el usuario en la interfaz de usuario web, mejorando la experiencia del usuario al proporcionar un registro detallado de sus actividades. Además, Alan contibuyó con un patrón de arquitectura en el código de la aplicación web, garantizando una mejor mantenibilidad y escalabilidad del proyecto.",
      enviroment: "frontend"
    },
    {
      name: "Anderson Martínez",
      description:
        "Desarrolló una encuesta al finalizar que permite a los usuarios proporcionar retroalimentación sobre la precisión de las estimaciones, permitiendo clasificarlas como correctas, sobreestimadas, subestimadas o incorrectas. Además, Anderson creó un reporte que muestra los resultados de estas encuestas, proporcionando una visión general de la precisión de las estimaciones realizadas en la plataforma.",
      enviroment: "frontend"
    },
    {
      name: "Fabian Montenegro",
      description:
        "Contribuyó a disponer de un área específica para la publicación de publicidad en forma de banners.También diseñó e insertó un pie de página y por último, añadio un tour guiado para nuevos usuarios, proporcionando instrucciones claras sobre cómo utilizar la página.",
      enviroment: "frontend"
    },
    {
      name: "Camila Murillo",
      description:
        "Contribuyó al mejoramiento de la interfaz de usuario de la página web, implementando un fondo temático que enriquece visualmente el entorno digital y promueve una conexión más profunda entre los usuarios y la herramienta. Además, armonizó el título con la identidad de marca mediante la personalización del estilo del mismo en la página web.",
      enviroment: "frontend"
    },
    {
      name: "Andrés Muñoz",
      description:
        "Integró una ventana de créditos dentro del apartado Acerca de de la interfaz web, permitiendo a los usuarios conocer a las personas que han contribuido al desarrollo del proyecto.",
      enviroment: "frontend"
    },
    {
      name: "Carlos Muñoz",
      description:
        "Estableció un mecanismo para el envío de tokens que permiten el acceso a diversos servicios. Definió la estructura básica del resultado esperado, proporcionando una guía clara sobre cómo debería lucir el resultado final una vez que se haya enviado y validado el token. También contribuyó al desarrollo de una interfaz que permite a los usuarios visualizar y gestionar su perfil.",
      enviroment: "frontend"
    },
    {
      name: "Edgar Peña",
      description:
        "Diseñó un botón que permite a los usuarios definir su idioma preferido para la lectura y escritura. Además, integró un cuadro de texto que ajusta dinámicamente su tamaño según la longitud de la tarea ingresada.",
      enviroment: "frontend"
    },
    {
      name: "Jhonattan Pinzón",
      description:
        "Incluyó una gestión de horarios que proporciona mensajes contextualizados en diferentes momentos del día. Además, integró la capacidad de personalizar el tema de la interfaz entre oscuro y claro. Asimismo, incorporó una función de evaluación mediante pulgar arriba o pulgar abajo para las respuestas proporcionadas, permitiendo a los usuarios expresar rápidamente su satisfacción o insatisfacción con el contenido.",
      enviroment: "frontend"
    },
    {
      name: "Oscar Páez",
      description:
        "Agregó una opción en la interfaz web que permite a los usuarios visualizar las consultas realizadas por otros usuarios.",
      enviroment: "frontend"
    },
    {
      name: "Marcelo Puentes",
      description:
        "Diseñó y renderizó un logotipo conforme a las especificaciones de la marca, el cual se ubica en la parte superior central de la aplicación. Además, añadió un ícono favicon acorde al logotipo previamente diseñado y por último, creó y renderizó un splash screen o pantalla de carga, que proporciona retroalimentación visual al usuario durante el proceso de carga de la página.",
      enviroment: "frontend"
    },
    {
      name: "Ferney Ramos",
      description:
        "Implementó una sección de preguntas frecuentes (FAQ) que proporciona a los usuarios respuestas claras y concisas a las consultas más comunes sobre el funcionamiento de la aplicación y también fue responsable de integrar una sección de términos y condiciones, así como una política de privacidad.",
      enviroment: "frontend"
    },
    {
      name: "Diego Rojas",
      description:
        "Integró varias características en la aplicación web, incluyendo un sistema de traducciones manual que permite a los usuarios seleccionar su idioma preferido, un mecanismo de restricción de acceso para proteger la confidencialidad de la información y una integración con Google Analytics para analizar la interacción del usuario y obtener métricas importantes que informan decisiones estratégicas y mejoran la experiencia del usuario.",
      enviroment: "frontend"
    },
    {
      name: "Brayan Rojas",
      description:
        "Aplicó un estilo de diseño que incluye esquinas redondeadas al cuadro de entrada de texto para mejorar la estética y la usabilidad de la interfaz de usuario.",
      enviroment: "frontend"
    },
    {
      name: "Oliver Velázquez",
      description:
        "Se encargo de agregar el sistema de escritura por voz en la interfaz web del software SET. Además, contribuyó al diseño de un icono distintivo para la función de voz y agregó una animación para este icono.",
      enviroment: "frontend"
    },
    {
      name: "Laura Yañez",
      description:
        "Añadio un botón de compartir en la interfaz de usuario de la aplicación web, permitiendo a los usuarios compartir rápidamente la respuesta generada por la aplicación a través de correo electrónico o chat de WhatsApp.",
      enviroment: "frontend"
    },
    {
      name: "Javier Enciso - Director del Proyecto ",
      description:
        "Encargado de la toma de decisiones estratégicas respecto al proyecto y asignación de tareas a los equipos de trabajo.",
      enviroment: "frontend"
    },
  ];
};
