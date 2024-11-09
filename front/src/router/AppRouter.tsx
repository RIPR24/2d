import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../login/LoginCon";
import Canvas from "../canvas";
import LoginCon from "../login/LoginCon";
import SignupCon from "../login/SignupCon";
import Notfound from "./Notfound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Notfound />,
      children: [
        {
          path: "",
          element: <Login />,
          children: [
            {
              path: "/login",
              element: <LoginCon />,
              index: true,
            },
            {
              path: "/signup",
              element: <SignupCon />,
            },
          ],
        },
        {
          path: "/canvas",
          element: <Canvas />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
