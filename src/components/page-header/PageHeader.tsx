import { Breadcrumb, Button, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./page-header.scss";
type Props = {
  form: string;
  loading?: boolean;
  disabled?: boolean;
  headerBreadcrumb?: any;
  edit?: boolean;
  isConfirm?: boolean;
  confirmLoading?: boolean;
  onConfirm?: () => void;
  toggleConfirm?: boolean;
  allowApprove?: boolean;
  onApprove: (val: any) => void;
  isAllowApprove?: boolean;
  disableApprove?: boolean;
};

const PageHeader = ({
  form,
  loading = false,
  disabled = false,
  headerBreadcrumb,
  edit,
  isConfirm = false,
  confirmLoading = false,
  onConfirm,
  toggleConfirm,
  allowApprove,
  onApprove,
  isAllowApprove,
  disableApprove,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <div className="breadcrumb">
        {headerBreadcrumb && headerBreadcrumb.length > 0 && (
          <Breadcrumb>
            {headerBreadcrumb.map((item: any) => {
              return (
                <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        )}
      </div>
      <div className="page-header-btn">
        <Button loading={loading} onClick={() => navigate(-2)}>
          Trở lại
        </Button>
        {edit !== false && (
          <Button
            disabled={disabled || disableApprove}
            loading={loading}
            form={form}
            htmlType="submit"
            type="primary"
          >
            Lưu
          </Button>
        )}
        {isConfirm && !allowApprove && (
          <Button
            disabled={disableApprove}
            onClick={() => onConfirm && onConfirm()}
            loading={confirmLoading}
            type="primary"
          >
            {!toggleConfirm ? "Xác nhận giao dịch" : "Hủy xác nhận giao dịch"}
          </Button>
        )}

        {isAllowApprove && (
          // <Button
          //   onClick={() => onApprove && onApprove()}
          //   loading={false}
          //   type="primary"
          // >
          //   {toggleConfirm ? "Duyệt" : "Từ chối"}
          // </Button>

          <Select
            disabled={disableApprove}
            onChange={(val: any) => onApprove && onApprove(val)}
            value={allowApprove}
            style={{ width: "150px", marginLeft: "4px" }}
          >
            <Select.Option value={0}>Chờ duyệt</Select.Option>
            <Select.Option value={1}>Duyệt</Select.Option>
            <Select.Option value={2}>Hủy</Select.Option>
          </Select>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
