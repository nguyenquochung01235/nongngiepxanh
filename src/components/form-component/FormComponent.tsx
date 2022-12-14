import { Button, Col, Form, Row, Space, Spin } from "antd";
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
  addField?: boolean;
  onAddField?: any;
  categoryOfActivity?: any;
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
  addField = false,
  onAddField,
  categoryOfActivity = [],
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

        {categoryOfActivity && categoryOfActivity.length > 0 && (
          <>
            <div className="category-of-activity">
              <h3>V???t t?? s??? d???ng: </h3>
              <div>
                {categoryOfActivity.map((item: any) => {
                  return (
                    <Row gutter={[16, 16]} style={{ marginBottom: "12px" }}>
                      <Col lg={8} md={8} sm={24} xs={24}>
                        <span>
                          <span className="m-r-4"> T??n v???t t??: </span>
                          <b>
                            {" "}
                            {JSON.parse(item?.id_giaodichmuaban_vattu)?.value ||
                              ""}
                          </b>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={24} xs={24}>
                        <span>
                          <span className="m-r-4"> S??? l?????ng:</span>
                          <b> {item?.soluong || ""}</b>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={24} xs={24}>
                        <span>
                          <span className="m-r-4"> Th???i gia s??? d???ng:</span>
                          <b> {item?.timeuse || ""}</b>
                        </span>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <Row style={{ position: "relative" }}>
          <div className="common-form-submit">
            <Space>
              <Button
                className={hideBtnSubmit ? "hide" : ""}
                loading={loading}
                form={name}
                type="primary"
                htmlType="submit"
              >
                {initialValues && Object.keys(initialValues).length > 0
                  ? "C???p nh???t"
                  : buttonSubmit || "Th???c hi???n"}
              </Button>
              {addField && (
                <Button
                  type="primary"
                  onClick={() => onAddField && onAddField()}
                >
                  {addField ? "Th??m v???t t??" : "Th??m tr?????ng"}
                </Button>
              )}
            </Space>
            {goBackUrl && showBack && (
              <Button style={{ marginLeft: "4px" }}>
                <Link to={goBackUrl}>Tr??? v???</Link>
              </Button>
            )}
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default FormComponent;
