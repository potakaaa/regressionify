import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ResultsPage from "./pages/ResultsPage.tsx";
import { ThemeProvider } from "./components/provider/theme-provider.tsx";
import { GlobalStateProvider } from "./components/provider/global-provider.tsx";

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
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <GlobalStateProvider>
      <RouterProvider router={router} />
    </GlobalStateProvider>
  </ThemeProvider>
);
