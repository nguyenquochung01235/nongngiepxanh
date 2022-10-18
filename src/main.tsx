import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/antd.less";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import RootRouter from "./routes/RootRouter";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <RootRouter></RootRouter>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
