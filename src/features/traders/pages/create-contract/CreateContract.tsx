import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Collapse, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import contractApi from "../../../../api/contract";
import traderApi from "../../../../api/trader";
import AutoComplete from "../../../../components/auto-complete/AutoComplete";
import { validateMessage } from "../../../../utils/validateMessage";
import "./create-trader.scss";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useNavigate } from "react-router-dom";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";

type Props = {};

const CreateContract = (props: Props) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<any>(undefined);
  const [ckData, setCkData] = useState();
  const [seachValue, setSearchValue] = useState<string>("");
  const [dataContract, setDataContract] = useState<any>({});
  const navigate = useNavigate();

  const mutation_create_contract = useMutation((data: any) => {
    return contractApi.create(data);
  });

  const handleSubmitForm = (values: any) => {
    values.id_hoptacxa = user?.id_hoptacxa || "";
    values.description_hopdongmuaban = ckData || "";

    mutation_create_contract.mutate(values, {
      onSuccess: (data: any) => {
        getResponseMessage(data);
        navigate("/trader/contract-management");
      },
      onError: (err) => {
        getErrorMessage(err);
      },
    });
  };

  const fetchDetailTrader = () => {
    return traderApi.getDetail();
  };

  const detailTrader = useQuery<any>(["contract/detail"], fetchDetailTrader);

  const fetchSeason = (id: string | number) => {
    return contractApi.getListSeason(id);
  };

  const season = useQuery<any>(
    ["contract/season", user?.id_hoptacxa || ""],
    () => fetchSeason(user?.id_hoptacxa || "")
  );

  console.log(dataContract);

  const handleSeachUser = async () => {
    mutation.mutate(
      { phone_number: seachValue },
      {
        onSuccess: (data) => {
          setUser(data.data);
          setDataContract((pre: any) => {
            return {
              ...pre,
              user: data.data || {},
            };
          });
        },
        onError: () => {
          setUser(null);
        },
      }
    );
  };

  const mutation = useMutation((value: any) => {
    return contractApi.searchUser(value);
  });

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
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
            style={{ alignItems: "center" }}
          >
            <Col lg={12} md={12} sm={24} xs={24}>
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
            <Col lg={12} md={12} sm={24} xs={24}>
              <div
                className="add-user-to-htx__search"
                style={{ position: "relative", top: "2px" }}
              >
                <Input
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Tìm kiếm hợp tác xã"
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
              {user === undefined &&
                "Tìm kiếm hợp tác xã bạn muốn tạo hợp đồng"}
              {user === null && "Không tìm thấy hợp tác xã"}
              {user && (
                <Collapse defaultActiveKey={["B"]} bordered={false}>
                  <Collapse.Panel header="Bên B" key="B">
                    {user && (
                      <>
                        <p className="align-center">
                          <span className="trader-label"> Tên hợp tác xã:</span>
                          <span className="trader-detail">
                            {user?.name_hoptacxa || ""}
                          </span>
                        </p>
                        <p className="align-center">
                          <span className="trader-label"> Số điện thoại: </span>
                          <span className="trader-detail">
                            {user?.phone_number || ""}
                          </span>
                        </p>
                        <p className="align-center">
                          <span className="trader-label"> Đại chỉ: </span>
                          <span className="trader-detail">
                            {user?.address || ""}
                          </span>
                        </p>
                        <p className="align-center">
                          <span className="trader-label">
                            {" "}
                            Người đại diện:{" "}
                          </span>
                          <span className="trader-detail">
                            {user?.name_hoptacxa || ""}
                          </span>
                        </p>
                      </>
                    )}
                  </Collapse.Panel>
                </Collapse>
              )}
            </Col>
          </Row>
          <br />
          {user && (
            <>
              <Row gutter={24}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="id_lichmuavu"
                    label="Mùa vụ"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Mùa vụ"
                      onChange={(value: any) =>
                        setDataContract((pre: any) => {
                          return {
                            ...pre,
                            season: value,
                          };
                        })
                      }
                    >
                      {season &&
                        season?.data?.data.map((item: any) => {
                          return (
                            <Select.Option
                              key={item.id_lichmuavu}
                              value={item.id_lichmuavu}
                            >
                              {item.name_lichmuavu}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AutoComplete
                    onSelect={(value: any) =>
                      setDataContract((pre: any) => {
                        return { ...pre, rice: value || "" };
                      })
                    }
                    keyword="name_gionglua"
                    type="gionglua"
                    Key="id_gionglua"
                    Value="name_gionglua"
                    name="id_gionglua"
                    lable="Giống lúa"
                  ></AutoComplete>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <AutoComplete
                    onSelect={(value: any) =>
                      setDataContract((pre: any) => {
                        return { ...pre, category: value || "" };
                      })
                    }
                    type="danhmucquydinh"
                    Key="id_danhmucquydinh"
                    Value="name_danhmucquydinh"
                    name="id_danhmucquydinh"
                    lable="Danh mục quy định"
                  ></AutoComplete>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onChange={(event: any, editor: any) => {
                      const data = editor.getData();
                      setCkData(data);
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <div className="common-form-submit">
                  <Button
                    form={"create-contract"}
                    type="primary"
                    htmlType="submit"
                    loading={mutation_create_contract.isLoading}
                  >
                    Tạo hợp đồng
                  </Button>
                </div>
              </Row>
            </>
          )}
        </Form>
      </div>
      <br />
    </div>
  );
};

export default CreateContract;
