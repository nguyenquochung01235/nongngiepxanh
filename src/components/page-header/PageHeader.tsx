import { Breadcrumb, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./page-header.scss";
type Props = {
  form: string;
  loading?: boolean;
  disabled?: boolean;
};

const PageHeader = ({ form, loading = false, disabled = false }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Hợp tác xã</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Chi tiết lịch mùa vụ</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="page-header-btn">
        <Button loading={loading} onClick={() => navigate(-2)}>
          Trở lại
        </Button>
        <Button
          disabled={disabled}
          loading={loading}
          form={form}
          htmlType="submit"
          type="primary"
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
