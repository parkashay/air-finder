import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./theme/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/client";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
