import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Form, Input, Popconfirm, Row } from "antd";
import React, { useState } from "react";
import axiosClient from "../../../../api/axiosClient";
import categoryApi from "../../../../api/category";
import CommonPage from "../../../../components/common-page/CommonPage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import { validateMessage } from "../../../../utils/validateMessage";

type Props = {};

const Suppiler = (props: Props) => {
  const modalChildren = [
    {
      name: "id_danhmucquydinh",
      label: "Danh mục quy định",
      rules: {
        required: true,
      },
      formChildren: <Input placeholder="Danh mục quy định"></Input>,
    },
    {
      name: "name_category_vattu",
      label: "Tên vật tư",
      rules: {
        required: true,
      },
      formChildren: <Input placeholder="Tên vật tư"></Input>,
    },
  ];

  const [detailCategory, setDetailCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleEditCategory = async (id: number | string) => {
    setLoadingDetail(true);
    setIsEdit(true);
    setShowModal(true);
    try {
      const res = await categoryApi.getDetail(id);
      setDetailCategory(res.data);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const tableColumns = [
    {
      title: "ID danh mục ",
      dataIndex: "id_danhmucquydinh",
    },
    {
      title: "Tên vật tư",
      dataIndex: "name_category_vattu",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (text: any, record: any) => (
        <>
          <span
            className=""
            onClick={() => handleEditCategory(record?.id_danhmucquydinh || "")}
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
              title="Xóa vật tư?"
              // onConfirm={() =>
              //   // handleConfirmDeleteCategory(record?.id_danhmucquydinh)
              // }
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </>
      ),
    },
  ];

  const handleConfirmDeleteCategory = async (id: string) => {
    setDeleteId(id);

    try {
      const res = await categoryApi.delete(id);
      getResponseMessage(res);
    } catch (error) {
      getErrorMessage(error);
    }
  };

  return (
    <CommonPage
      onChangeModal={(value: boolean) => setShowModal(value)}
      onEdit={(value: any) => setIsEdit(value)}
      isShowModal={showModal}
      modalChildren={modalChildren}
      buttonTitle="Tạo vật tư"
      modalTitle="Tạo vật tư"
      buttonSubmit="Tạo"
      submitUrl="category-vattu/create"
      tableColumns={tableColumns}
      commonHeading="Danh sách vật tư"
      commonUrl="/category-vattu/get-list"
      baseUrl="trader/supplier"
      loadingModal={loadingDetail}
      isUpdate={isEdit}
      name="supplier"
      updateUrl="category-vattu/update"
      deleteId={deleteId}
    ></CommonPage>
  );
};

export default Suppiler;
