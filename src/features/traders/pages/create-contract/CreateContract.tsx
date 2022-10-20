import { TabPanel } from "@mui/lab";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Collapse, Form, Input, Row } from "antd";
import React, { useState } from "react";
import htxApi from "../../../../api/htx";
import traderApi from "../../../../api/trader";
import { validateMessage } from "../../../../utils/validateMessage";
import "./create-trader.scss";

type Props = {};

const CreateContract = (props: Props) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<any>(undefined);
  const [seachValue, setSearchValue] = useState<string>("");
  const handleSubmitForm = (values: any) => {
    console.log(values);
  };

  const fetchUserList = () => {
    return traderApi.getDetail();
  };

  const detailTrader = useQuery<any>(["user/list"], fetchUserList);

  const handleSeachUser = async () => {
    mutation.mutate(
      { phone_number: seachValue },
      {
        onSuccess: (data) => {
          setUser(data.data);
        },
        onError: () => {
          setUser(null);
        },
      }
    );
  };

  const mutation = useMutation((value: any) => {
    return htxApi.searchUser(value);
  });

  console.log(user);

  return (
    <div className="create-contract">
      <h3 className="create-contract-heading">Tạo hợp đồng</h3>
      <div className="create-contract-form">
        <Form
          form={form}
          layout="vertical"
          name="create-contract"
          validateMessages={validateMessage()}
          onFinish={handleSubmitForm}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
            <Col span={12}>
              <Form.Item
                name="title_hopdongmuaban"
                label="Tên hợp đồng"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Tên hơp đồng" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Collapse defaultActiveKey={["1"]} bordered={false}>
                <Collapse.Panel header="Bên A" key="1">
                  {detailTrader && detailTrader.data && (
                    <>
                      <p className="align-center">
                        <span className="trader-label"> Tên thương lái:</span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.name_thuonglai || ""}
                        </span>
                      </p>
                      <p className="align-center">
                        <span className="trader-label"> Số điện thoại: </span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.phone_number || ""}
                        </span>
                      </p>
                      <p className="align-center">
                        <span className="trader-label"> Đại chỉ: </span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.address || ""}
                        </span>
                      </p>
                      <p className="align-center">
                        <span className="trader-label"> Người đại diện: </span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.fullname || ""}
                        </span>
                      </p>
                    </>
                  )}
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div className="add-user-to-htx__search">
                <Input
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Tìm kiếm vã viên"
                  size="middle"
                  style={{ borderRadius: "5px" }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSeachUser();
                    }
                  }}
                />
                <Button
                  loading={mutation.isLoading}
                  type="primary"
                  style={{ borderRadius: "5px" }}
                  onClick={handleSeachUser}
                >
                  Tìm kiếm
                </Button>
              </div>
              <br />
              <Collapse defaultActiveKey={["B"]} bordered={false}>
                <Collapse.Panel header="Bên B" key="B">
                  {detailTrader && detailTrader.data && (
                    <>
                      <p className="align-center">
                        <span className="trader-label"> Tên thương lái:</span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.name_thuonglai || ""}
                        </span>
                      </p>
                      <p className="align-center">
                        <span className="trader-label"> Số điện thoại: </span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.phone_number || ""}
                        </span>
                      </p>
                      <p className="align-center">
                        <span className="trader-label"> Đại chỉ: </span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.address || ""}
                        </span>
                      </p>
                      <p className="align-center">
                        <span className="trader-label"> Người đại diện: </span>
                        <span className="trader-detail">
                          {detailTrader.data?.data?.fullname || ""}
                        </span>
                      </p>
                    </>
                  )}
                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
          <br />
          <Row>
            <div className="common-form-submit">
              <Button form={"create-contract"} type="primary" htmlType="submit">
                Tạo hợp đồng
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default CreateContract;
