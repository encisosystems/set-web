import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import HistoryPage from "./pages/view/history";
import { About } from "./pages/view/About";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "history/:idUser",
        element: <HistoryPage />,
      },
      {
        path: "credits",
        element: <About />,
      },
    ]
  },
 
]);
