import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Table,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./detail-season.scss";
import queryString from "query-string";
import { useSelector } from "react-redux";
import calendarApi from "../../../../../../api/calendar";
import { useMutation, useQuery } from "@tanstack/react-query";
import activityApi from "../../../../../../api/activity";
import { formatMoment } from "../../../../../../utils/formatMoment";
import { validateMessage } from "../../../../../../utils/validateMessage";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Props = {};

const DetailSeaSon = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [filter, setFilter] = useState({
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 5,
    search: searchParams.get("search") || "",
  });

  useEffect(() => {
    (() => {
      navigate(
        `/htx/manage-season/detail/${id}?${queryString.stringify(filter)}`
      );
    })();
  }, [filter]);

  const htx = useSelector((state: any) => state.htx.role);

  const columns = useMemo(() => {
    const columns: ColumnsType<any> = [
      {
        title: "Tên hoạt động",
        dataIndex: "name_hoatdong",
      },
      {
        title: "Môt tả hoạt động",
        dataIndex: "description_hoatdong",
        rowSpan: 4,
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
        title: "Hành động",
        dataIndex: "",
        key: "x",
        render: (text, record: any) => (
          <>
            <span
              className=""
              onClick={() => {
                // navigate("/admin/manage-season/detail/" + record?.id_lichmuavu);
              }}
              style={{
                display: "inline-block",
                marginRight: "16px",
                cursor: "pointer",
              }}
            >
              <EditOutlined />
            </span>
            <span
              className=""
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                console.log(e);
              }}
            >
              <Popconfirm
                placement="top"
                title="Xóa hoạt động?"
                onConfirm={() => handleConfirmDeleteActivity(record)}
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

  const handleConfirmDeleteActivity = (record: any) => {
    console.log(record);
  };

  const fetchSeasonDetail = () => {
    return calendarApi.getDetail({
      id_lichmuavu: id,
      id_hoptacxa: htx.id_hoptacxa,
    });
  };

  const seaSonDetail = useQuery(["season/detail"], fetchSeasonDetail);

  const fetchActivitySeason = (filter: any) => {
    return activityApi.getAll({
      id_lichmuavu: id,
      id_hoptacxa: htx.id_hoptacxa,
      ...filter,
    });
  };

  const activity: any = useQuery(["season/activity", filter], () =>
    fetchActivitySeason(filter)
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (values: any) => {
    values.id_hoptacxa = htx.id_hoptacxa;
    values.id_lichmuavu = id;
    values.date_start = formatMoment(values.date_start);
    values.date_end = formatMoment(values.date_end);

    mutation_create_activity.mutate(values, {
      onSuccess: (val) => {
        setIsModalOpen(false);
        activity.refetch();
      },
    });
  };

  const mutation_create_activity = useMutation((data: any) =>
    activityApi.create(data)
  );

  const handlePagination = (page: number) => {
    setFilter((pre) => {
      return {
        ...pre,
        page,
      };
    });
  };

  const handleSearchActivity = (value: any) => {
    setFilter((pre) => {
      return {
        ...pre,
        search: value?.search?.trim() || "",
      };
    });
  };

  return (
    <div className="detail-season">
      <Row gutter={30}>
        <Col lg={12} md={12} sm={20} xs={20}>
          <Skeleton loading={seaSonDetail.isLoading} active>
            <p></p>
          </Skeleton>
        </Col>
        <Col lg={10} md={10} sm={20} xs={20}>
          <Skeleton loading={seaSonDetail.isLoading} active>
            <p></p>
          </Skeleton>
        </Col>
      </Row>

      {seaSonDetail.data && seaSonDetail.data.data && (
        <Row>
          <Col span={24} className="add-user-to-htx-des">
            <Descriptions title="Chi tiết lịch mùa vụ">
              <Descriptions.Item label="Tên mùa vụ">
                {seaSonDetail.data?.data.name_lichmuavu}
              </Descriptions.Item>
              <Descriptions.Item label="Tên giống lúa">
                {seaSonDetail.data?.data.name_lichmuavu}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {seaSonDetail.data?.data.status}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                {seaSonDetail.data?.data.date_start}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc">
                {seaSonDetail.data?.data.date_end}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      )}

      {seaSonDetail.isLoading ? (
        <div className="activity-action">
          <Space
            style={{
              width: "100%",
              padding: "16px 16px 20px 0",
              justifyContent: "space-between",
            }}
          >
            <Skeleton.Button
              active={true}
              shape="default"
              style={{ width: "150px" }}
            />
            <Skeleton.Button
              active={true}
              shape="default"
              style={{ width: "150px" }}
            />
            <Skeleton.Button
              active={true}
              shape="default"
              style={{ width: "200px" }}
            />
          </Space>
        </div>
      ) : (
        <div className="activity-action">
          <Space
            align="center"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <div className="btn btn-add-activity">
              <Button onClick={showModal} type="primary">
                Thêm hoạt động
              </Button>
            </div>
            <div className="apply-activity">
              <Button type="primary">Áp lịch mùa vụ</Button>
            </div>
            <div className="seach-activity">
              <Form
                form={form2}
                layout="vertical"
                name="search-activity"
                id="search-activity"
                onFinish={handleSearchActivity}
              >
                <Form.Item name="search">
                  <Space>
                    <Input
                      defaultValue={filter.search}
                      placeholder="Tìm kiếm hoạt động"
                    ></Input>
                    <Button
                      form="search-activity"
                      type="primary"
                      htmlType="submit"
                    >
                      Tìm kiếm
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </Space>
        </div>
      )}

      <Table
        loading={activity.isLoading || activity.isFetching}
        columns={columns}
        dataSource={activity?.data?.data}
        pagination={false}
      />
      <div className="pagiantion">
        {activity?.data?.meta?.total > 0 && (
          <Pagination
            defaultCurrent={filter.page as number}
            total={activity?.data?.meta?.total}
            pageSize={filter.limit as number}
            onChange={handlePagination}
          />
        )}
      </div>
      <Modal
        title="Tạo hoạt động mùa vụ"
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
          name="add activity season"
          onFinish={onSubmit}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="name_hoatdong"
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
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="description_hoatdong"
                label="Mô tả hoạt đông"
              >
                <Input.TextArea rows={4}></Input.TextArea>
              </Form.Item>
              <Form.Item>
                <Button
                  form="add activity season"
                  type="primary"
                  htmlType="submit"
                  className="btn"
                  loading={mutation_create_activity.isLoading}
                >
                  Thêm hoạt động
                </Button>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
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
              <Form.Item
                name="date_end"
                label="Ngày kết thúc"
                hasFeedback
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
  );
};

export default DetailSeaSon;
