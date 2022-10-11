import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../../../api/userApi";
import { IRoleOfUser } from "../../../../../model";
import { getErrorMessage } from "../../../../../utils/getErrorMessage";
import RegisterForm, {
  IRegisterValues,
} from "../../components/register-form/RegisterForm";
import "./register.scss";
type Props = {};

const Register = (props: Props) => {
  const [userRole, setUserRole] = useState<IRoleOfUser[]>([]);
  const navigate = useNavigate();
  const mutation = useMutation((values: any) => {
    return userApi.register(values);
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getRoleOfUser();
        setUserRole(res.data);
      } catch (error) {}
    })();
  }, []);

  const handleSubmit = (values: IRegisterValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        message.success("Đăng kí tài khoản thành công");
        navigate("/login");
      },

      onError: (err) => {
        if (getErrorMessage(err).length > 0) {
          getErrorMessage(err).map((item: string) => message.error(item));
        }
      },
    });
  };

  return (
    <div className="register">
      <RegisterForm
        loading={mutation.isLoading}
        onSubmit={handleSubmit}
        userRole={userRole}
      ></RegisterForm>
    </div>
  );
};

export default Register;
