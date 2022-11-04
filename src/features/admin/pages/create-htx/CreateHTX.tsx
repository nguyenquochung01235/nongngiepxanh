import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import htxApi from "../../../../api/htx";
import { PATH } from "../../../../enum";
import { hasHTX } from "../../../../redux/htxSlice";
import { toggleLoading } from "../../../../redux/loadingSlice";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import { validateMessage } from "../../../../utils/validateMessage";
import "./create-htx.scss";

type Props = {};

const CreateHTX = (props: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const user_id = useSelector((state: any) => state.user.user.id_user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    values.id_user = user_id;
    setLoading(true);

    try {
      const res = await htxApi.createHTX(values);
      getResponseMessage(res);
      dispatch(hasHTX(true));
      navigate(`${PATH.HTX}${PATH.DASHBOARD}`);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-htx-form">
      <div className="create-htx-form__heading">Tạo hợp tác xã</div>
      <Form
        validateMessages={validateMessage()}
        form={form}
        layout="vertical"
        name="create-htx"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="name_hoptacxa"
              label="Tên hợp tác xã"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Hợp tác xã" />
            </Form.Item>
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
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="btn"
              >
                Tạo hợp tác xã
              </Button>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                },
                {
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Ví dụ: ấp Thống, xã Hòa Hưng, huyện Cái Bè, tỉnh Tiền Giang"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateHTX;
