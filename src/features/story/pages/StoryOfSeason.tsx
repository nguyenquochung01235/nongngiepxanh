import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { DataSourceItemType } from "antd/lib/auto-complete";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import storyApi from "../../../api/storyApi";
import FormComponent from "../../../components/form-component/FormComponent";
import { formatMoment } from "../../../utils/formatMoment";
import { getResponseMessage } from "../../../utils/getResponseMessage";
import { getErrorMessage } from "../../../utils/getErrorMessage";

type Props = {};

const StoryOfSeason = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchForm] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 5,
    search: searchParams.get("search") || "",
  });

  useEffect(() => {
    (() => {
      navigate(
        `/htx/manage-story/detail/${id}?${queryString.stringify(filter)}`
      );
    })();
  }, [filter, id]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id_nhatkydongruong",
    },
    {
      title: "Tên hoạt động",
      dataIndex: "name_hoatdong",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "date_start",
    },
    {
      width: "20%",
      title: "Ngày kết thúc",
      dataIndex: "date_end",
    },
    {
      title: (
        <div>
          <span>Hoàn thành</span>
          <Checkbox
            style={{ marginLeft: "16px" }}
            onChange={(e) => handleCheckAllActivity(e)}
          ></Checkbox>
        </div>
      ),
      dataIndex: "status",
      render: (_: any, record: any) => {
        return (
          <div>
            <Checkbox
              style={{ marginLeft: "16px" }}
              disabled={record?.type !== "inside"}
              defaultChecked={record?.status || false}
              checked={record?.status || false}
              onChange={(e) =>
                handleChangeStatus(record?.id_nhatkydongruong || "", e)
              }
            ></Checkbox>
            <span>
              {record.type !== "inside" && (
                <span
                  style={{ cursor: "pointer", marginLeft: "16px" }}
                  className=""
                >
                  <Popconfirm
                    placement="top"
                    title="Xóa hoạt động?"
                    onConfirm={() =>
                      handleConfirmDeleteActivityOfSeason(
                        record?.id_nhatkydongruong || ""
                      )
                    }
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </span>
              )}
            </span>
          </div>
        );
      },
    },
  ];

  const handleCheckAllActivity = (e: any) => {
    console.log(e);
  };

  const handleConfirmDeleteActivityOfSeason = async (id: string | number) => {
    try {
      const res = await storyApi.delete(id);
      getResponseMessage(res);
      refetch();
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const seasonForm = [
    {
      name: "name_hoatdong",
      label: "Tên hoạt động",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input placeholder="Tên hoạt động"></Input>,
    },
    {
      name: "date_start",
      label: "Ngày bắt đầu",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: (
        <DatePicker placeholder="Ngày bắt đầu" style={{ width: "100%" }} />
      ),
    },
    {
      name: "description",
      label: "Mô tả",
      rules: [
        {
          required: true,
        },
      ],
      formChildren: <Input.TextArea placeholder="Mô tả"></Input.TextArea>,
    },
    {
      name: "date_end",
      label: "Ngày kết thúc",
      rules: [
        {
          required: true,
        },
        ({ getFieldValue }: any): any => ({
          validator(_: any, value: any) {
            if (!value || getFieldValue("date_start") < value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Ngày kết thúc phải lớn hơn ngày bắt đầu!")
            );
          },
        }),
      ],
      formChildren: (
        <DatePicker placeholder="Ngày kết thúc" style={{ width: "100%" }} />
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const fetchActivityOfSeasonList = (filter: any) => {
    return storyApi.getAll(id as string, filter);
  };

  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
    ["storyOfSeason/list", filter],
    () => fetchActivityOfSeasonList(filter),
    { cacheTime: 0 }
  ) as any;

  const mutation_add_activity = useMutation((data: any) =>
    storyApi.createActivity(data)
  );

  const handleChangeStatus = async (id: any, e: any) => {
    setChangeStatusLoading(true);

    try {
      const res = await storyApi.updateStatus(id);
      getResponseMessage(res);
      refetch();
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setChangeStatusLoading(false);
    }
  };

  const handleFormSubmit = (values: any) => {
    values.id_lichmuavu = id || "";
    values.date_start = formatMoment(values.date_start);
    values.id_thuadat = 7;
    values.date_end = formatMoment(values.date_end);

    mutation_add_activity.mutate(values, {
      onSuccess: (res) => {
        getResponseMessage(res);
        setIsModalOpen(false);
        refetch();
      },
      onError: (err) => getErrorMessage(err),
    });
  };

  const handleSearchActivity = (value: { search: string }) => {
    setFilter((pre) => {
      return {
        ...pre,
        search: value?.search?.trim() || "",
      };
    });
  };

  const handlePagination = (page: number) => {
    setFilter((pre) => {
      return {
        ...pre,
        page,
      };
    });
  };

  console.log(data?.data);

  return (
    <div className="season-of-story">
      <div>
        <Button onClick={showModal}>Thêm hoạt động</Button>
      </div>
      <br />
      <h3>Danh sách hoạt động</h3>
      <div style={{ textAlign: "right" }}>
        <Form
          form={searchForm}
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
              <Button form="search-activity" type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Table
          pagination={false}
          loading={isLoading || changeStatusLoading}
          columns={columns}
          dataSource={data?.data}
          rowClassName={(record) =>
            record.type !== "inside" ? "disabled-row" : ""
          }
        />
      </div>
      <div className="pagiantion">
        {data?.meta?.total > 0 && (
          <Pagination
            defaultCurrent={filter.page as number}
            total={data?.meta?.total}
            pageSize={filter.limit as number}
            onChange={handlePagination}
          />
        )}
      </div>
      <Modal
        onCancel={handleCancel}
        title="Tạo hoạt động"
        open={isModalOpen}
        bodyStyle={{ height: "300px" }}
        width="70%"
      >
        <FormComponent
          loading={mutation_add_activity.isLoading || false}
          onSubmit={handleFormSubmit}
          name="activityOfSeason"
          buttonSubmit="Thêm hoạt động"
          data={seasonForm}
        ></FormComponent>
      </Modal>
    </div>
  );
};

export default StoryOfSeason;
