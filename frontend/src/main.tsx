import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import ResultsPage from "./pages/ResultsPage.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/results",
        element: <ResultsPage />,
        errorElement: <div>404 Not Found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
