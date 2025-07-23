import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { Homepage } from "./pages/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Homepage,
      },
    ],
  },
]);
