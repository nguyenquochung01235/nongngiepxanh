import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/antd.less";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import RootRouter from "./routes/RootRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Provider store={store}>
      <BrowserRouter>
        <RootRouter></RootRouter>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
