import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Form, Input, Popconfirm, Row } from "antd";
import React from "react";
import CommonPage from "../../../../components/common-page/CommonPage";
import { validateMessage } from "../../../../utils/validateMessage";

type Props = {};

const ContractManagement = (props: Props) => {
  const modalChildren: any = [];

  const tableColumns = [
    {
      title: "Thương lái",
      dataIndex: "id_thuonglai",
    },
    {
      title: "Hợp tác xã",
      dataIndex: "id_hoptacxa",
    },
    {
      title: "Lịch mùa vụ",
      dataIndex: "id_lichmuavu",
    },
    {
      title: "Giống lúa",
      dataIndex: "id_gionglua",
    },
    {
      title: "Danh mục thuốc",
      dataIndex: "id_danhmucquydinh",
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
      newPage
      linkToNewPage="/trader/contract-create"
      buttonTitle="Tạo hợp đồng"
      tableColumns={tableColumns}
      commonHeading="Danh sách hợp đồng"
      commonUrl="/hopdongmuaban/get-list"
      baseUrl="trader/contract-management"
    ></CommonPage>
  );
};

export default ContractManagement;
