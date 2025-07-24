import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import queryClient from "./api/client";
import { router } from "./routes";
import { ThemeProvider } from "./theme/ThemeProvider";

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
