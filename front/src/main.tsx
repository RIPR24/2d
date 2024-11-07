import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";
import TwoDcontext from "./context/TwoDcontext";

createRoot(document.getElementById("root")!).render(
  <TwoDcontext>
    <RouterProvider router={router} />
  </TwoDcontext>
);
