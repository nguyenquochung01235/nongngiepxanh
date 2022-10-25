import { Spin } from "antd";
import React, { ReactComponentElement } from "react";
import { useSelector } from "react-redux";

type Props = {
  children: ReactComponentElement<any>;
};

const AllPageLoading = ({ children }: Props) => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  return isLoading ? (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large">{children}</Spin>
    </div>
  ) : (
    <>{children}</>
  );
};

export default AllPageLoading;
