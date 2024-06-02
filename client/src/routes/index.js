import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "email",
        element: <CheckEmailPage></CheckEmailPage>,
      },
      {
        path: "password",
        element: <CheckPasswordPage></CheckPasswordPage>,
      },
      {
        path: "",
        element: <Home></Home>,
        children: [
          {
            path: ":userId",
            element: <MessagePage></MessagePage>,
          },
        ],
      },
    ],
  },
]);

export default router;
