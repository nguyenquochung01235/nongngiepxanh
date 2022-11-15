import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import materialsApi from "../../../../api/materials";
import queryString from "query-string";

type Props = {};

const ShopManagement = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 5,
    search: searchParams.get("search") || "",
  });

  useEffect(() => {
    (() => {
      navigate(`/shop/shop-management?${queryString.stringify(filter)}`);
    })();
  }, [filter]);

  const fetchMaterials = (filter: any) => materialsApi.getAll(filter);

  const materials: any = useQuery(["materials", filter], () =>
    fetchMaterials(filter)
  );

  const tableColumns: any = [
    {
      title: "ID",
      dataIndex: "id_giaodich_luagiong",
    },
    {
      title: "Mùa vụ",
      dataIndex: "name_lichmuavu",
    },
    {
      title: "Giống lúa",
      dataIndex: "name_gionglua",
    },
    {
      title: "Xã viên",
      dataIndex: "name_xavien",
    },
    {
      title: "Daily",
      dataIndex: "name_daily",
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Htx xác nhận",
      dataIndex: "hoptacxa_xacnhan",
    },
    {
      title: "Ncc xác nhận",
      dataIndex: "nhacungcap_xacnhan",
    },
    {
      title: "Xã viên xác nhận",
      dataIndex: "xavien_xacnhan",
    },
    {
      fixed: "right",
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (text: any, record: any) => (
        <>
          <span
            className=""
            // onClick={() => handleEditCategory(record?.id_danhmucquydinh || "")}
            onClick={
              () => {}
              // navigate(
              //   `/trader/category-management/detail/${
              //     record?.id_danhmucquydinh || ""
              //   }`
              // )
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
              onConfirm={
                () => {}
                // handleConfirmDeleteCategory(record?.id_danhmucquydinh)
              }
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
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
      <Table
        scroll={{ x: 1300 }}
        loading={materials.isLoading}
        columns={tableColumns}
        dataSource={materials?.data?.data || []}
        pagination={false}
      />
      <div className="pagiantion">
        {materials?.data?.meta?.total > 0 && (
          <Pagination
            defaultCurrent={filter?.page as number}
            total={materials?.data?.meta?.total}
            pageSize={filter?.limit as number}
            onChange={handlePagination}
          />
        )}
      </div>
    </div>
  );
};

export default ShopManagement;
