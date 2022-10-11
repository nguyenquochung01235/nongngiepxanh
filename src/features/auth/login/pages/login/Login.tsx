import { message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../../../../api/userApi";
import { LoginPayload } from "../../../../../model";
import { storeUser } from "../../../../../redux/userSlice";
import { setToken } from "../../../../../utils/jwt";
import LoginForm from "../../components/login-form/LoginForm";
import "./login.scss";
type Props = {};

const Login = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginPayload) => {
    setLoading(true);
    try {
      const res = await userApi.login(values);
      const access_token = res.access_token;
      const user = res.data[0];

      localStorage.setItem("access_token_luanvan", access_token);
      localStorage.setItem("user_luanvan", JSON.stringify(user));
      setToken(access_token);

      message.success("Đăng nhập thành công");
      dispatch(storeUser({ user, access_token }));
      navigate("/");
      setLoading(false);
    } catch (error) {
      message.error("Tài khoản hoặc mật khẩu không đúng!");
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <LoginForm loading={loading} onSubmit={handleSubmit}></LoginForm>
    </div>
  );
};

export default Login;
