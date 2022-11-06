import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/antd.less";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import RootRouter from "./routes/RootRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import vi_VN from "antd/es/locale/vi_VN";
import Pusher from "pusher-js";

const queryClient = new QueryClient();

var pusher = new Pusher("a4b9a95d179cda3450fe", {
  cluster: "ap1",
});

var channel = pusher.subscribe("notification.57");
channel.bind("notification", function (data: any) {
  alert(JSON.stringify(data));
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={vi_VN}>
          <RootRouter></RootRouter>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
