import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Form, Input, Popconfirm, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../../api/axiosClient";
import categoryApi from "../../../../api/category";
import CommonPage from "../../../../components/common-page/CommonPage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import { validateMessage } from "../../../../utils/validateMessage";

type Props = {};

const CategoryPertocodesManagement = (props: Props) => {
  const navigate = useNavigate();
  const [detailCategory, setDetailCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const modalChildren = [
    {
      name: "name_danhmucquydinh",
      label: "Danh mục phân bón quy định",
      rules: {
        required: true,
      },
      formChildren: <Input placeholder="Danh mục phân bón quy định"></Input>,
    },
  ];

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
      title: "Tên danh mục",
      dataIndex: "name_danhmucquydinh",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (text: any, record: any) => (
        <>
          <span
            className=""
            // onClick={() => handleEditCategory(record?.id_danhmucquydinh || "")}
            onClick={() =>
              navigate(
                `/trader/category-management/detail/${
                  record?.id_danhmucquydinh || ""
                }`
              )
            }
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
              title="Xóa danh mục?"
              onConfirm={() =>
                handleConfirmDeleteCategory(record?.id_danhmucquydinh)
              }
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
      initialValue={detailCategory}
      modalChildren={modalChildren}
      buttonTitle="Tạo danh mục qui định"
      modalTitle="Tạo danh mục qui định"
      buttonSubmit="Tạo"
      submitUrl="danhmucquydinh/create"
      tableColumns={tableColumns}
      commonHeading="Danh sách quy định"
      commonUrl="/danhmucquydinh/get-list"
      baseUrl="trader/category-management"
      loadingModal={loadingDetail}
      isUpdate={isEdit}
      name="trader"
      updateUrl="danhmucquydinh/update"
      deleteId={deleteId}
    ></CommonPage>
  );
};

export default CategoryPertocodesManagement;
