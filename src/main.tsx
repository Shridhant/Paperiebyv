import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";

// Import our routes
import { Route as rootRoute } from "./routes/__root.tsx";
import { Route as indexRoute } from "./routes/index.tsx";

// Build the route tree
const routeTree = rootRoute.addChildren([indexRoute]);

// Create the router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
