import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Pagination, Popconfirm, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import queryString from "query-string";
import materialsApi from "../../../api/materials";
import userRiceTransactionApi from "../../../api/userRiceTransaction";
import { formatPrice } from "../../../utils/formatPrice";
import { getResponseMessage } from "../../../utils/getResponseMessage";
import { getErrorMessage } from "../../../utils/getErrorMessage";

type Props = {
  baseUrl?: string;
  role?: string;
};

const RiceTransactionManagement = ({ baseUrl, role }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 5,
    search: searchParams.get("search") || "",
  });

  // useEffect(() => {
  // //   (() => {
  // //     navigate(
  // //       `/${baseUrl || "shop"}/shop-management?${queryString.stringify(filter)}`
  // //     );
  // //   })();
  // // }, [filter]);
  // console.log(role);

  const fetchListRiceTransaction = (filter: any) =>
    role == "chunhiem"
      ? userRiceTransactionApi.getAllChairman(filter)
      : userRiceTransactionApi.getAll(filter);

  const userRiceTransaction: any = useQuery(
    ["user/rice/transaction", filter],
    () => fetchListRiceTransaction(filter)
  );

  const handleConfirm = (value: any, id: any, type: any) => {
    if (value !== null) {
      //approve here
    } else {
      mutation_confirm_rice_transaction.mutate(id, {
        onSuccess: (res) => {
          getResponseMessage(res);
          userRiceTransaction.refetch();
        },
        onError: (err) => {
          getErrorMessage(err);
        },
      });
    }
  };

  const mutation_confirm_rice_transaction = useMutation((id) =>
    userRiceTransactionApi.confirm(id)
  );

  const tableColumns: any = [
    {
      title: "ID",
      width: "5%",
      dataIndex: "id_giaodichmuaban_lua",
    },
    {
      title: "Tên lô hàng",
      width: "15%",
      dataIndex: "name_lohang",
    },
    {
      title: "Mùa vụ",
      width: "15%",
      dataIndex: "name_lichmuavu",
    },
    {
      title: "Xã viên",
      dataIndex: "name_xavien",
    },
    {
      title: "Tên thương lái",
      dataIndex: "name_thuonglai",
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (_: any, record: any) => {
        return <span>{formatPrice(record?.rice || 0)}</span>;
      },
    },
    {
      title: "Trạng thái",
      width: "10%",
      dataIndex: "status",
      render: (text: any, record: any) => {
        return (
          <span>
            {record?.status == 0 ? (
              <span className="not-success">chưa hoàn thành</span>
            ) : (
              <span className="success">hoàn thành</span>
            )}
          </span>
        );
      },
    },
    {
      title: "Htx xác nhận",
      width: "8%",
      dataIndex: "hoptacxa_xacnhan",
      render: (text: any, record: any) => {
        return (
          <span>
            {record?.hoptacxa_xacnhan == 0 ? (
              <span className="not-confirm">chưa xác nhận</span>
            ) : record?.hoptacxa_xacnhan == 2 ? (
              <span className="refuse">Đã hủy</span>
            ) : (
              <span className="confirm">xác nhận</span>
            )}
          </span>
        );
      },
    },
    {
      title: "Thương lái xác nhận",
      width: "8%",
      dataIndex: "thuonglai_xacnhan",
      render: (text: any, record: any) => {
        return (
          <span>
            {record?.thuonglai_xacnhan == 0 ? (
              <span className="not-confirm">chưa xác nhận</span>
            ) : (
              <span className="confirm">xác nhận</span>
            )}
          </span>
        );
      },
    },
    {
      title: "Xã viên xác nhận",
      dataIndex: "xavien_xacnhan",
      width: "8%",
      render: (text: any, record: any) => {
        return (
          <span>
            {record?.xavien_xacnhan == 0 ? (
              <span className="not-confirm">chưa xác nhận</span>
            ) : (
              <span className="confirm">xác nhận</span>
            )}
          </span>
        );
      },
    },
    {
      fixed: "right",
      title: "Hành động",
      width: "12%",
      dataIndex: "",
      key: "x",
      render: (text: any, record: any) => (
        <>
          <span
            className=""
            onClick={() =>
              navigate(
                `/${baseUrl || "htx"}/rice-transaction-management/detail/${
                  record?.id_giaodichmuaban_lua || ""
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
          {/* <Select
            onChange={(value: number | string) =>
              handleConfirm(value, record?.id_giaodichmuaban_lua || "")
            }
            size="small"
            value={record?.thuonglai_xacnhan + "" || ""}
            placeholder="Trạng thái"
            style={{ width: 150 }}
            options={[
              {
                value: "0",
                label: "Chưa xác nhận",
              },
              {
                value: "1",
                label: "Xác nhận",
              },
              {
                value: "2",
                label: "Hủy",
              },
            ]}
          /> */}

          <Button
            loading={mutation_confirm_rice_transaction.isLoading}
            onClick={() =>
              handleConfirm(null, record?.id_giaodichmuaban_lua, "trader")
            }
            type="primary"
          >
            {record?.thuonglai_xacnhan ? "Hủy xác nhận" : "Xác nhận"}
          </Button>
        </>
      ),
    },
  ];

  const handlePagination = (page: number) => {
    setFilter((pre) => {
      return {
        ...pre,
        page,
      };
    });
  };

  return (
    <div className="shop-management">
      <Button>
        <Link to="/shop/shop-management/create-shop">Tạo hợp đồng</Link>
      </Button>
      <h3 style={{ margin: "16px 0" }}>Danh sách hợp đồng mua bán lúa</h3>
      <Table
        scroll={{ x: 2000 }}
        loading={userRiceTransaction.isLoading}
        columns={tableColumns}
        dataSource={userRiceTransaction?.data?.data || []}
        pagination={false}
      />
      <div className="pagiantion">
        {userRiceTransaction?.data?.meta?.total > 0 && (
          <Pagination
            defaultCurrent={filter?.page as number}
            total={userRiceTransaction?.data?.meta?.total}
            pageSize={filter?.limit as number}
            onChange={handlePagination}
          />
        )}
      </div>
    </div>
  );
};

export default RiceTransactionManagement;
