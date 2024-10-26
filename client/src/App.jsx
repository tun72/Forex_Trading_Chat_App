import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./router/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
      cacheTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 1000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
          },
        }}
      ></Toaster>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
