import { useEffect, useState } from "react";
import { fetchHistory } from "../../data/history/fetchHistory";
import { useParams } from "react-router-dom";

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const { idUser } = useParams();

  const getHistory = async () => {
    try {
      const history = await fetchHistory(idUser);
      const estimaciones = history.map((e) => {
        if (e.estimation.smart) {
          const tasksString = _getTasksStringSmart(e);
          const estimacionMap = _getTotalEstimate(tasksString, e);
          return { estimations: estimacionMap, date: e.date };
        }
        const estimations = e.estimation.tasks
          .map((t, index) => (index === 0 ? `${t.task}` : `\t• ${t.task}`))
          .join("\n");
        return { estimations: estimations, date: e.date };
      });

      setHistory(estimaciones);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

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

  useEffect(() => {
    getHistory();
  });

  return {
    history,
    idUser,
    error,
    setHistory,
  };
};
