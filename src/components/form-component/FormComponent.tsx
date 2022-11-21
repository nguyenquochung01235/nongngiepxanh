import { Button, Col, Form, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { validateMessage } from "../../utils/validateMessage";

type Props = {
  data: any;
  onSubmit?: (data: any) => void;
  name: string;
  buttonSubmit?: string;
  loading?: boolean;
  hideBtnSubmit?: boolean;
  initialValues?: any;
  onDisable?: any;
  goBackUrl?: string;
  showBack?: boolean;
  isCreate?: boolean;
  updateId?: any;
  onReset?: any;
  type?: string;
};

const FormComponent = ({
  data,
  onSubmit,
  name,
  buttonSubmit,
  loading = false,
  hideBtnSubmit,
  initialValues = {},
  onDisable,
  goBackUrl,
  showBack,
  isCreate,
  updateId,
  type,
}: Props) => {
  const [formCommon] = Form.useForm();

  useEffect(() => {
    if (type === "create") {
      formCommon.setFieldsValue({});
    }
  }, [type]);

  useEffect(() => {
    if (initialValues) {
      formCommon.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  useEffect(() => {
    if (isCreate) {
      formCommon.resetFields();
    }
  }, [isCreate, updateId]);

  let dataChildren = [];

  if (data && data.length > 0) {
    dataChildren = data.map((item: any, index: number) => {
      if (item.autoComplete) {
        return (
          <Col key={index} lg={12} md={12} sm={24} xs={24}>
            {item.autoComplete}
          </Col>
        );
      } else if (item.editor) {
        return (
          <Col key={index} span={24}>
            {item.editor}
          </Col>
        );
      } else {
        return index % 2 === 0 ? (
          <Col key={index} lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={item?.name} label={item?.label} rules={item.rules}>
              {item.formChildren}
            </Form.Item>
          </Col>
        ) : (
          <Col key={index} lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={item?.name} label={item?.label} rules={item.rules}>
              {item.formChildren}
            </Form.Item>
          </Col>
        );
      }
    });
  }

  const handleSubmitForm = (values: any) => {
    console.log(values);

    if (onSubmit) {
      onSubmit(values);
    }
  };

  const handleFieldsChange = (values: any) => {
    setTimeout(() => {
      if (onDisable) {
        if (
          formCommon.getFieldsError().filter(({ errors }) => errors.length)
            .length > 0
        ) {
          onDisable(true);
        } else {
          onDisable(false);
        }
      }
    }, 200);
  };

  const handleSubmitFormFailed = (a: any) => {
    console.log(a);
  };

  return (
    <div>
      <Form
        onFieldsChange={handleFieldsChange}
        form={formCommon}
        layout="vertical"
        name={name}
        validateMessages={validateMessage()}
        onFinish={handleSubmitForm}
        onFinishFailed={handleSubmitFormFailed}
        initialValues={initialValues}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          {dataChildren.length > 0 && dataChildren}
        </Row>
        <Row>
          <div className="common-form-submit">
            <Button
              className={hideBtnSubmit ? "hide" : ""}
              loading={loading}
              form={name}
              type="primary"
              htmlType="submit"
            >
              {initialValues && Object.keys(initialValues).length > 0
                ? "Cập nhật"
                : buttonSubmit || "Thực hiện"}
            </Button>
            {goBackUrl && showBack && (
              <Button style={{ marginLeft: "4px" }}>
                <Link to={goBackUrl}>Trở về</Link>
              </Button>
            )}
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default FormComponent;
