import { Breadcrumb, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./page-header.scss";
type Props = {
  form: string;
  loading?: boolean;
  disabled?: boolean;
  headerBreadcrumb?: any;
  edit?: boolean;
};

const PageHeader = ({
  form,
  loading = false,
  disabled = false,
  headerBreadcrumb,
  edit,
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
            disabled={disabled}
            loading={loading}
            form={form}
            htmlType="submit"
            type="primary"
          >
            Lưu
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
