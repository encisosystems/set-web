import App from "./App";
import {createBrowserRouter} from "react-router-dom"
import HistoryPage from "./pages/view/history";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "history/:idUser",
      element: <HistoryPage />,
      
    },
  ]);