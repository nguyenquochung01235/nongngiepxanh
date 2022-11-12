import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Table,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import calendarApi from "../../../../api/calendar";
import AutoComplete from "../../../../components/auto-complete/AutoComplete";
import { formatMoment } from "../../../../utils/formatMoment";
import { validateMessage } from "../../../../utils/validateMessage";

interface DataType {
  key: React.Key;
  name: string;
  type: string;
  start: string;
  end: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên hoạt động",
    dataIndex: "name_hoatdong",
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
    title: "Mô tả",
    dataIndex: "description_hoatdong",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const SeaSonActivity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [id_gionglua, setId_gionglua] = useState();
  const htx = useSelector((state: any) => state.htx);

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
      onSuccess: () => message.success("Tạo lịch thành công"),
    });
  };

  const handleSelect = (values: any) => {
    setId_gionglua(values);
  };

  const fetchCalendarList = () => {
    // return calendarApi.getAll();
  };
  const { isLoading, isError, data, error, isFetching } = useQuery(
    ["user/list"],
    fetchCalendarList
  );

  return (
    <div className="season-management">
      <Button onClick={showModal}>Thêm hoạt động mùa vụ</Button>

      <div className="list-user">
        <br />
        <h3>Danh sách hoạt động mùa vụ</h3>
        <br />
        <Table
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={[]}
          onChange={onChange}
        />
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
                  label="Tên hoạt động"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Tên hoạt động" />
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
                    Thêm hoạt động
                  </Button>
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item name="id_gionglua" label="Lịch mùa vụ">
                  {/* <AutoComplete
                    placeholder="lịch mùa vụ"
                    onSelect={handleSelect}
                    Key="id_gionglua"
                    Value="name_gionglua"
                  ></AutoComplete> */}
                </Form.Item>
                <Form.Item
                  name="date_end"
                  label="Ngày kết thúc"
                  rules={[
                    {
                      required: true,
                    },
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

export default SeaSonActivity;
