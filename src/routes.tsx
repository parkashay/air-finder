import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { Homepage } from "./pages/Homepage";
import { SearchPage } from "./pages/SeaarchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "search",
        Component: SearchPage,
      },
    ],
  },
]);
