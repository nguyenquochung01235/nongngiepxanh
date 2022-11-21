import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input, Modal, Popconfirm, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import htxApi from "../../../../api/htx";
import { convertToMoment } from "../../../../utils/convertToMoment";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import "./htx-story-management.scss";

type Props = {};

const HTXStorymanagement = (props: Props) => {
  const [showReason, setShowReason] = useState(false);
  const [reasonValue, setReasonValue] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id_nhatkydongruong",
    },
    {
      title: "ID thửa đất",
      dataIndex: "id_thuadat",
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
      title: "Ngày kết thúc",
      dataIndex: "date_end",
    },
    {
      title: "Htx xác nhận",
      dataIndex: "hoptacxa_xacnhan",
      render: (_, record) => (
        <span>
          {record?.status == 0
            ? "Chưa xác nhận"
            : record?.status == 1
            ? "Đã xác nhận"
            : "Đã bị hủy"}
        </span>
      ),
    },
    {
      title: "Loại hoạt động",
      dataIndex: "type",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "20%",
    },
    {
      width: "15%",
      title: "Hành động",
      fixed: "right",
      dataIndex: "",
      key: "x",
      render: (text, record: any) => (
        <>
          <Select
            onChange={(value: number | string) =>
              handleConfirm(value, record?.id_nhatkydongruong || "")
            }
            size="small"
            value={record?.hoptacxa_xacnhan + "" || ""}
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
                label: "Đã bị hủy",
              },
            ]}
          />
        </>
      ),
    },
  ];

  const handleConfirm = (value: any, id: string) => {
    if (value != 2) {
      mutation_update_confirm.mutate(
        { id: id, hoptacxa_xacnhan: value },
        {
          onSuccess: (res) => {
            getResponseMessage(res);
            storyOfUser.refetch();
          },
          onError: (err) => {
            getErrorMessage(err);
          },
        }
      );
    } else {
      setShowReason(true);
      setDeleteId(id);
    }
  };

  const handleSubmitReason = () => {};

  const mutation_update_confirm = useMutation((data: any) =>
    htxApi.htxConfirm(data?.id || "", data)
  );

  const [filter, setFilter] = useState({
    hoptacxa_xacnhan: 0,
    type: "outside",
  });

  const [tabList, setTabList] = useState([
    {
      key: "0",
      name: "Đang chờ xác nhận",
      active: true,
      hoptacxa_xacnhan: 0,
      type: "outside",
    },
    {
      key: "1",
      name: "Đã xác nhận",
      active: false,
      hoptacxa_xacnhan: 1,
      type: "outside",
    },
    {
      key: "2",
      name: "Đã bị hủy",
      active: false,
      hoptacxa_xacnhan: 2,
      type: "outside",
    },
  ]);

  const fetchStoryOfUser = (filter: any) => htxApi.storyOfUser(filter);
  const storyOfUser = useQuery(["story-of-user", filter], () =>
    fetchStoryOfUser(filter)
  );

  const handleChangeTab = (key: string | number) => {
    if (tabList && tabList.length > 0) {
      tabList.forEach((item: any) => {
        item.active = false;
      });

      const currentItem = tabList.find((item: any) => item.key === key);
      if (currentItem) {
        console.log(currentItem);

        currentItem.active = true;
        setTabList([...tabList]);

        setFilter((pre: any) => {
          return {
            ...pre,
            hoptacxa_xacnhan: currentItem.hoptacxa_xacnhan,
            type: currentItem.type,
          };
        });
      }
    }
  };

  const handleSave = () => {
    mutation_update_confirm.mutate(
      { id: deleteId, hoptacxa_xacnhan: 2, reason: reasonValue },
      {
        onSuccess: (res) => {
          getResponseMessage(res);
          storyOfUser.refetch();
          setShowReason(false);
        },
        onError: (err) => {
          getErrorMessage(err);
        },
      }
    );
  };

  return (
    <div className="story-of-user">
      <Modal
        title="Lý do từ chối"
        open={showReason}
        onCancel={() => setShowReason(false)}
      >
        <Input
          placeholder="Lý do từ chỗi"
          onChange={(e) => setReasonValue(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSave();
            }
          }}
        />
        <br />
        <Button
          loading={mutation_update_confirm.isLoading}
          type="primary"
          onClick={handleSave}
        >
          Lưu
        </Button>
      </Modal>
      <h3>Nhập ký đồng ruộng</h3>
      <ul className="tab-activity-user">
        {tabList &&
          tabList.map((item: any) => (
            <li
              onClick={() => handleChangeTab(item?.key || "")}
              className={item?.active ? "active" : ""}
              key={item?.key}
            >
              {item?.name || ""}
            </li>
          ))}
      </ul>
      <Table
        scroll={{ x: 1300 }}
        loading={
          storyOfUser.isLoading ||
          storyOfUser.isFetching ||
          mutation_update_confirm.isLoading
        }
        columns={columns}
        dataSource={storyOfUser?.data?.data || []}
        pagination={false}
      />
    </div>
  );
};

export default HTXStorymanagement;
