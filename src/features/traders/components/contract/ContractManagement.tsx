import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Form, Input, Popconfirm, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import contractApi from "../../../../api/contract";
import CommonPage from "../../../../components/common-page/CommonPage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import { validateMessage } from "../../../../utils/validateMessage";

type Props = {
  baseUrl?: string;
  allowCreate?: boolean;
};

const ContractManagement = (props: Props) => {
  const { baseUrl, allowCreate = true } = props;
  const [deleteId, setDeleteId] = useState<any>();
  const navigate = useNavigate();

  const modalChildren: any = [];

  const tableColumns = [
    {
      title: "Thương lái",
      dataIndex: "name_thuonglai",
    },
    {
      title: "Hợp tác xã",
      dataIndex: "name_hoptacxa",
    },
    {
      title: "Giống lúa",
      dataIndex: "name_gionglua",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Nội dung",
      dataIndex: "title_hopdongmuaban",
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
              navigate(
                `/${baseUrl || "trader/contract-management"}/detail/` +
                  record?.id_hopdongmuaban
              );
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
              title="Xóa hợp đồng?"
              onConfirm={() =>
                handleConfirmDeleteContract(record.id_hopdongmuaban || "")
              }
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </>
      ),
    },
  ];

  const handleConfirmDeleteContract = async (id: string | number) => {
    try {
      setDeleteId(id);
      const res = await contractApi.delete(id);
      getResponseMessage(res);
    } catch (error) {
      getErrorMessage(error);
    }
  };

  return (
    <CommonPage
      allowCreate={allowCreate}
      deleteId={deleteId}
      newPage
      linkToNewPage="/trader/contract-management/contract-create"
      buttonTitle="Tạo hợp đồng"
      tableColumns={tableColumns}
      commonHeading="Danh sách hợp đồng"
      commonUrl="/hopdongmuaban/get-list"
      baseUrl={baseUrl || "trader/contract-management"}
      name="contract"
    ></CommonPage>
  );
};

export default ContractManagement;
