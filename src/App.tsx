import "@radix-ui/themes/styles.css";
import Router from "@/Router";
import { GlobalStyles } from "@/common/styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Theme>
        <Router />
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
