
export const useHome = () => {
 /*const [task, setTask] = useState("");
    const [estimations, setEstimations] = useState("");
    const [showEstimations, setShowEstimations] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [id, setID] = useState(0);
    const [idLanguage, setIdLanguage] = useState(1);
    const [ratingValue, setRatingValue] = useState(0);
    const [toast, setToast] = useState({ open: false, message: "", severity: "" });
    const [anchorEl, setAnchorEl] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

  const handleEstimate = async () => {
    try {
      setShowEstimations(false);
      setShowCopy(false);
      setShowLoading(true)
      if (!task) {
          setToast({
              open: true,
              message: "Por favor, ingrese un objetivo antes de obtener la estimación.",
              severity: "warning",
          });
          setShowLoading(false);
      }
      const data = await fetchEstimations(task);
      if (data.smart) {
        // Procesa y muestra las estimaciones si smart es true
        const tasksString = _getTasksStringSmart(data);
        setEstimations(_getTotalEstimate(tasksString,data));
        setShowEstimations(true);
        setShowCopy(true);
      } else {
        const tasksString = data.estimation.tasks
          .map((t, index) => (index === 0 ? `${t.task}` : `\t• ${t.task}`))
          .join("\n");

        setEstimations(tasksString);
        setShowEstimations(true);
        setShowCopy(false); // Controla la visibilidad del botón de copia
      }
      id.current = data.id;
    }
    catch (error) {
        setEstimations(`Error al obtener las estimaciones: ${error.message}`);
        setShowEstimations(true);
        setShowCopy(false); // Ocultar el botón de copia en caso de error
    }
    finally{
        setShowLoading(false);
    }
  };

 const copyToClipboard = () => {
    navigator.clipboard.writeText(estimations).then(() => {
      setToast({
        open: true,
        message: "Estimaciones copiadas al portapapeles",
          severity: "success",
      });
    });
  };

  // funciones privadas
  const _getTasksStringSmart = (data) => {
    return data.estimation.tasks
      .map((t) => `•\t${t.task} - Estimado: ${t.estimated_hours} horas`)
      .join("\n");
  };

  const _getTotalEstimate = (tasksString, data) => {
    return `${tasksString}\n\nTotal estimado: ${data.estimation.tasks.reduce(
      (acc, curr) => acc + curr.estimated_hours,
      0
    )} horas`;
  };

  const onChangeRating = async (_, newRating) => {
    setRatingValue(newRating)
      console.log(newRating);
      try {
          const response = await fetch(`${API_URL}/API/estimations/${id}`, {
              method: "POST",
              body: JSON.stringify({
                  stars: newRating,
              }),
              headers: {
                  "Content-Type": "application/json",
              },
          });
          setToast({
              open: true,
              message: "Gracias por evaluar las Estimaciones",
              severity: "success",
          });
      } catch (error) {
          console.error("Error fetching estimations:", error);
          throw error;
      }
  }

  return {
    task, setTask,
    estimations, setEstimations,
    showEstimations, setShowEstimations,
    showCopy, setShowCopy,
    toast, setToast,
    handleEstimate,
    copyToClipboard,
    onChangeRating
  };*/
};
