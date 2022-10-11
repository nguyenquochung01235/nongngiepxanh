import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Form, Input, Popconfirm, Row } from "antd";
import React from "react";
import CommonPage from "../../../../components/common-page/CommonPage";
import { validateMessage } from "../../../../utils/validateMessage";

type Props = {};

const CategoryPertocodesManagement = (props: Props) => {
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
            style={{ cursor: "pointer" }}
            className=""
            onClick={(e) => {
              console.log(e);
            }}
          >
            <Popconfirm
              placement="top"
              title="Xóa xã viên khỏi hợp tác xã?"
              // onConfirm={() => handleConfirmDeleteUser(record)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </>
      ),
    },
  ];

  return (
    <CommonPage
      modalChildren={modalChildren}
      buttonTitle="Tạo danh mục phân bón"
      modalTitle="Tạo danh mục phân bón"
      buttonSubmit="Tạo danh mục phân bón"
      submitUrl="danhmucquydinh/create"
      tableColumns={tableColumns}
      commonHeading="Danh sách quy định"
      commonUrl="/danhmucquydinh/get-list"
      baseUrl="trader/create-category-management"
    ></CommonPage>
  );
};

export default CategoryPertocodesManagement;
