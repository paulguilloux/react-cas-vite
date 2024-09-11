import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CasUserContextProvider } from "./context/casUserContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.jsx";
import Home from "./routes/Home.jsx";
import SecureHome from "./routes/SecureHome.jsx";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/secure",
        element: <SecureHome />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CasUserContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CasUserContextProvider>
  </StrictMode>
);
