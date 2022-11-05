import {
  FilterOutlined,
  ReloadOutlined,
  SettingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Checkbox, Popover, Tooltip } from "antd";
import { useMemo } from "react";
import "./action-of-list.scss";

type Props = {
  onReset?: () => void;
  onRefetch?: () => void;
  onSettings?: () => void;
  onFilter?: () => void;
  columns?: any;
  onSetFilterCol?: (data: any) => void;
};

const ActionOfList = (props: Props) => {
  const { onReset, onRefetch, onSettings, onFilter, columns, onSetFilterCol } =
    props;

  let checkData = useMemo(() => {
    return [...columns];
  }, []);

  const onCheckedChange = (e: any) => {
    if (e.target.checked) {
      const filterCol =
        columns &&
        columns.filter((item: any) => item?.dataIndex !== e.target.value);

      onSetFilterCol && onSetFilterCol(filterCol);
    } else {
      const currentCol = checkData.find(
        (item: any) => item.dataIndex === e.target.value
      );

      if (currentCol) {
        const showCols = [currentCol, ...columns];
        onSetFilterCol && onSetFilterCol(showCols);
      }
    }
  };

  const renderCheckbox = (data: any): any => {
    if (data && data.length > 0) {
      return (
        <div>
          {data.map((item: any) => {
            return (
              <div style={{ margin: "12px 0" }}>
                <Checkbox
                  value={item?.dataIndex || ""}
                  onChange={(e) => onCheckedChange(e)}
                >
                  {item?.title || ""}
                </Checkbox>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <></>;
    }
  };

  // const handleCheckAll = (e: any) => {
  //   if (e.target.checked) {
  //     if (checkData && checkData.length > 0) {
  //     }

  //     if(checkData && checkData.length > 0) {
  //       checkData = checkData.map((item: any) => {
  //         return {
  //           ...item,
  //           checked: true
  //         }
  //       })
  //     }
  //     onSetFilterCol && onSetFilterCol(checkData);
  //   } else {
  //     onSetFilterCol && onSetFilterCol([]);
  //   }
  // };

  return (
    <div className="action-of-list">
      <Tooltip placement="top" title={"Làm mới"}>
        <span
          className="action-of-list-icon"
          onClick={() => onRefetch && onRefetch()}
        >
          <ReloadOutlined />
        </span>
      </Tooltip>

      <Tooltip placement="top" title={"Đặt lại"}>
        <span
          className="action-of-list-icon"
          onClick={() => onReset && onReset()}
        >
          <SyncOutlined />
        </span>
      </Tooltip>

      <Tooltip placement="top" title={"Cài đặt"}>
        <span className="action-of-list-icon">
          <Popover
            content={renderCheckbox(checkData)}
            placement="bottomRight"
            title={<div>Ẩn hiện cột</div>}
            trigger="click"
          >
            <SettingOutlined />
          </Popover>
        </span>
      </Tooltip>

      <Tooltip placement="top" title={"Bộ lọc"}>
        <span className="action-of-list-icon">
          <FilterOutlined />
        </span>
      </Tooltip>
    </div>
  );
};

export default ActionOfList;
