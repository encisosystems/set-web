import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import HistoryPage from "./pages/view/history";
import { About } from "./pages/view/About";
import { PrivateRoute } from "./../src/pages/components/Private.route";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><App /></PrivateRoute>,
    children: [
      {
        path: "history/:idUser",
        element: <HistoryPage />,
      },
      {
        path: "credits",
        element: <About />,
      },
    ],
  },
  {
    path: "login",
    element : <h1>Login</h1>
  }
]);
