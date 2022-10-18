import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./common-page.scss";
import queryString from "query-string";
import commontApi from "../../api/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getResponseMessage } from "../../utils/getResponseMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { validateMessage } from "../../utils/validateMessage";

type Props = {
  buttonTitle: string;
  modalTitle: string;
  modalWidth?: number;
  modalChildren?: any;
  tableColumns?: any;
  commonUrl?: string;
  buttonSubmit?: string;
  submitUrl?: string;
  commonHeading?: string;
  baseUrl?: string;
};

const CommonPage = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 5,
    search: searchParams.get("search") || "",
  });

  const [form] = Form.useForm();
  const [commonForm] = Form.useForm();
  const {
    buttonTitle,
    modalTitle,
    modalWidth,
    modalChildren,
    tableColumns,
    commonUrl,
    buttonSubmit,
    submitUrl,
    commonHeading,
    baseUrl,
  } = props;

  useEffect(() => {
    (() => {
      navigate(`/${baseUrl || "/"}?${queryString.stringify(filter)}`);
    })();
  }, [filter]);

  let dataChildren = [];

  if (modalChildren && modalChildren.length > 0) {
    dataChildren = modalChildren.map((item: any, index: number) => {
      return index % 2 === 0 ? (
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item name={item?.name} label={item?.label} rules={[item.rules]}>
            {item.formChildren}
          </Form.Item>
        </Col>
      ) : (
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item name={item?.name} label={item?.label} rules={[item.rules]}>
            {item.formChildren}
          </Form.Item>
        </Col>
      );
    });
  }

  const fetchCommonList = (filter: any) => {
    return commontApi.getAll(commonUrl || "", filter);
  };

  const { isLoading, isError, data, error, isFetching, refetch } =
    useQuery<any>(["common/list", filter], () => fetchCommonList(filter));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value: any) => {
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

  const handleSubmitCommonForm = (values: any) => {
    mutation_common.mutate(values, {
      onSuccess: (res) => {
        getResponseMessage(res);
        refetch();
        setIsModalOpen(false);
      },
      onError: (err) => {
        getErrorMessage(err);
        setIsModalOpen(false);
      },
    });
  };

  const mutation_common = useMutation((data: any) =>
    commontApi.create(submitUrl || "", data)
  );

  return (
    <div className="common-page">
      <Button onClick={showModal}>{buttonTitle || ""}</Button>
      <Modal
        title={modalTitle || ""}
        onOk={handleCancel}
        open={isModalOpen}
        onCancel={handleCancel}
        width={modalWidth || "70%"}
      >
        <Form
          form={commonForm}
          layout="vertical"
          name="common-form"
          validateMessages={validateMessage()}
          onFinish={handleSubmitCommonForm}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
            {dataChildren.length > 0 && dataChildren}
          </Row>
          <Row>
            <div className="common-form-submit">
              <Button
                loading={mutation_common.isLoading}
                form="common-form"
                type="primary"
                htmlType="submit"
              >
                {buttonSubmit || "Thực hiện"}
              </Button>
            </div>
          </Row>
        </Form>
      </Modal>
      <div className="list-user">
        <br />
        <h3>{commonHeading || "Danh sách"}</h3>
        <div className="common-search">
          <Form
            form={form}
            layout="vertical"
            name="search-activity"
            onFinish={handleSearch}
          >
            <Form.Item name="search">
              <Space>
                <Input
                  defaultValue={filter.search}
                  placeholder="Tìm kiếm..."
                ></Input>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <Table
          loading={isLoading}
          columns={tableColumns}
          dataSource={data?.data || []}
          pagination={false}
        />
        <div className="pagiantion">
          {data?.meta.total > 0 && (
            <Pagination
              defaultCurrent={filter?.page as number}
              total={data?.meta?.total}
              pageSize={filter?.limit as number}
              onChange={handlePagination}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
