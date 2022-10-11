import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import userApi from "../../../../../api/userApi";
import AnimateComp from "../../../../../components/animate/AnimateCom";
import { LoginPayload } from "../../../../../model";
import { validateMessage } from "../../../../../utils/validateMessage";
import "./login-form.scss";

type Props = {
  onSubmit: (values: LoginPayload) => void;
  loading: boolean;
};

const LoginForm = ({ onSubmit, loading }: Props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: LoginPayload) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <AnimateComp>
      <div className="login-form">
        <div className="login-form__heading">Đăng nhập</div>
        <Form
          validateMessages={validateMessage()}
          form={form}
          layout="vertical"
          name="login"
          onFinish={onFinish}
        >
          <Form.Item
            name="phone_number"
            label="Số điện thoại"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Số điện thoại không đúng định dạng",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="btn"
            >
              Đăng nhập
            </Button>
            <span className="link-to">
              Chưa có tài khoản ? <Link to="/register">Đăng kí</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </AnimateComp>
  );
};

export default LoginForm;
