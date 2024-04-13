import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import HistoryPage from "./pages/view/history";
import { About } from "./pages/view/About";
import Profile from "./pages/profile";
export const router = createBrowserRouter([
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
  {
    path: "profile",
    element: <Profile />,
  },
]);
