import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Table,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import calendarApi from "../../../../../../api/calendar";
import AutoComplete from "../../../../../../components/auto-complete/AutoComplete";
import { formatMoment } from "../../../../../../utils/formatMoment";
import { validateMessage } from "../../../../../../utils/validateMessage";

interface DataType {
  key: React.Key;
  name: string;
  type: string;
  start: string;
  end: string;
}

const SeaSonManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [id_gionglua, setId_gionglua] = useState();

  const navigate = useNavigate();
  const htx = useSelector((state: any) => state.htx);

  const columns = useMemo(() => {
    const columns: ColumnsType<DataType> = [
      {
        title: "Tên lịch mùa vụ",
        dataIndex: "name_lichmuavu",
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "date_start",
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "date_end",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
      },
      {
        title: "Hành động",
        dataIndex: "",
        key: "x",
        render: (text, record: any) => (
          <>
            <span
              className=""
              onClick={() => {
                navigate("/htx/manage-season/detail/" + record?.id_lichmuavu);
              }}
              style={{
                display: "inline-block",
                marginRight: "16px",
                cursor: "pointer",
              }}
            >
              <EditOutlined />
            </span>
            <span style={{ cursor: "pointer" }} className="">
              <Popconfirm
                placement="top"
                title="Xóa lịch mùa vụ?"
                onConfirm={() => handleConfirmDeleteSeason(record)}
              >
                <DeleteOutlined />
              </Popconfirm>
            </span>
          </>
        ),
      },
    ];

    return columns;
  }, []);

  const handleConfirmDeleteSeason = (record: any) => {
    console.log(record);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const mutation_calendar = useMutation((data: any) =>
    calendarApi.createCalendar(data)
  );

  const onSubmit = (values: any) => {
    values.id_hoptacxa = htx.role.id_hoptacxa;
    values.id_gionglua = id_gionglua;
    values.date_start = formatMoment(values.date_start);
    values.date_end = formatMoment(values.date_end);

    mutation_calendar.mutate(values, {
      onError: () => message.error("có lỗi"),
      onSuccess: () => {
        refetch();
        setIsModalOpen(false);
        message.success("Tạo lịch thành công");
      },
    });
  };

  const handleSelect = (values: any) => {
    setId_gionglua(values);
  };

  const fetchCalendarList = () => {
    return calendarApi.getAll();
  };
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
    ["user/list"],
    fetchCalendarList
  );

  return (
    <div className="season-management">
      <Button onClick={showModal}>Thêm Lịch mùa vụ</Button>

      <div className="list-user">
        <br />
        <h3>Danh sách lịch mùa vụ</h3>
        <br />
        <Table loading={isLoading} columns={columns} dataSource={data?.data} />
        <Modal
          title="Tạo mùa vụ"
          onOk={handleCancel}
          open={isModalOpen}
          onCancel={handleCancel}
          bodyStyle={{ height: "300px" }}
          width="70%"
        >
          <Form
            validateMessages={validateMessage()}
            form={form}
            layout="vertical"
            name="register"
            onFinish={onSubmit}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="name_lichmuavu"
                  label="Tên mùa vụ"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Tên mùa vụ" />
                </Form.Item>
                <Form.Item
                  name="date_start"
                  label="Ngày bắt đầu"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={mutation_calendar.isLoading}
                    type="primary"
                    htmlType="submit"
                    className="btn"
                  >
                    Tạo lịch mùa vụ
                  </Button>
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item name="id_gionglua" label="Giống lúa">
                  <AutoComplete
                    onSelect={handleSelect}
                    Key="id_gionglua"
                    Value="name_gionglua"
                  ></AutoComplete>
                </Form.Item>
                <Form.Item
                  name="date_end"
                  label="Ngày kết thúc"
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("date_start") < value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Ngày kết thúc phải lớn hơn ngày bắt đầu!")
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SeaSonManagement;
