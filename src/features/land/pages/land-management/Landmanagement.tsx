import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import contractApi from "../../../../api/contract";
import CommonPage from "../../../../components/common-page/CommonPage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getResponseMessage } from "../../../../utils/getResponseMessage";

type Props = {
  baseUrl?: string;
};

const LandManagement = (props: Props) => {
  const { baseUrl } = props;
  const [deleteId, setDeleteId] = useState<any>();
  const navigate = useNavigate();

  const modalChildren: any = [];

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id_thuadat",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Vị trí",
      dataIndex: "location",
    },
    {
      title: "Hoạt động",
      dataIndex: "active",
    },

    {
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (text: any, record: any) => (
        <>
          <span
            className=""
            onClick={() => {}}
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
              title="Xóa thửa đất?"
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
      deleteId={deleteId}
      newPage
      linkToNewPage="/htx/manage-land/create"
      buttonTitle="Tạo thửa đất"
      tableColumns={tableColumns}
      commonHeading="Danh sách thửa đất"
      commonUrl="/thuadat/get-list"
      baseUrl={baseUrl || "trader/contract-management"}
      name="land/list"
    ></CommonPage>
  );
};

export default LandManagement;
