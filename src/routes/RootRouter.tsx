import { Route } from "react-router";
import { Routes } from "react-router-dom";
import AllPageLoading from "../components/loading/AllPageLoading";
import NotFound from "../components/not-found/NotFound";
import PreviewContract from "../components/preview/PreviewContract";
import Profile from "../components/profile/Profile";
import { PATH } from "../enum";
import CreateHTX from "../features/admin/pages/create-htx/CreateHTX";
import HomeAdmin from "../features/admin/pages/home-admin/HomeAdmin";
import Login from "../features/auth/login/pages/login/Login";
import Register from "../features/auth/register/pages/regsiter/Register";
import HomePage from "../features/home/pages/home-page/HomePage";
import HomeTraders from "../features/traders/components/home/HomeTraders";

type Props = {};

const RootRouter = (props: Props) => {
  return (
    <AllPageLoading>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path={PATH.LOGIN} element={<Login></Login>}></Route>
        <Route path={PATH.REGISTER} element={<Register></Register>}></Route>
        <Route path={`${PATH.HTX}/*`} element={<HomeAdmin></HomeAdmin>}></Route>
        <Route
          path={PATH.PREVIEW}
          element={<PreviewContract></PreviewContract>}
        ></Route>
        <Route
          path={`${PATH.TRADER}/*`}
          element={<HomeTraders></HomeTraders>}
        ></Route>
      </Routes>
    </AllPageLoading>
  );
};

export default RootRouter;
