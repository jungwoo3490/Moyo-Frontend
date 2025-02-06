import Router from "@/Router";
import { GlobalStyles } from "@/common/styles/GlobalStyles";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Theme accentColor="indigo" grayColor="slate">
        <Router />
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
