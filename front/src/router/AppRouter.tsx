import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Canvas from "../canvas";
import LoginCon from "../login/LoginCon";
import SignupCon from "../login/SignupCon";
import ConnectUser from "../Connect";
import Notfound from "./Notfound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Notfound />,
      children: [
        {
          path: "/login",
          element: <LoginCon />,
          index: true,
        },
        {
          path: "/canvas",
          element: <Canvas />,
        },
        {
          path: "/signup",
          element: <SignupCon />,
        },
        {
          path: "/connect/:sid/:call",
          element: <ConnectUser />,
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
