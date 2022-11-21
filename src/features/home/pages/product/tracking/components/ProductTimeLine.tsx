import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTimeline, {
  CustomLastTimeLineItem,
  CustomTimeLineItem,
} from "../../../../../../components/time-line";
import { ITrackingAndTracing } from "../../../../../../model/tracking-tracing";
import RiceDetail from "./RiceDetail";

const tracking: ITrackingAndTracing = {
  riceTransaction: {
    name: "Giao Dich Mua Ban Lua",
    buyer: "Nguyen Van A",
    saler: "Nguyen Van B",
    quantity: 2000,
    time: '12/12/2022'
  },
  productTransaction: {
    name: "Giao Dich Mua Ban San Pham",
    buyer: "Nguyen Van A",
    saler: "Nguyen Van B",
    quantity: 2000,
    time: '12/12/2022'
  },
};

const RiceTimeLine = () => {
  const [isShowRiceDetail, setIsShowRiceDetail] = useState(false);
  const [isShowProductDetail, setIsShowProductDetail] = useState(false);
  const [isShowSupplier, setIsShowShowSupplier] = useState(false);

  const handleShowRiceDetail = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    if (id === 2) {
      setIsShowRiceDetail((pre) => !pre);
    }
  };

  const render = (
    tenGiaoDich: string,
    nguoiMua: string,
    nguoiBan: string,
    soLuong: number,
    id: number
  ) => {
    return (
      <Box
        onClick={(e) => handleShowRiceDetail(e, id)}
        width={600}
        bgcolor="#40AA41"
        color="#ffffff"
        p={2}
        borderRadius={1}
        sx={{
          cursor: "pointer",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            zIndex: 10,
            width: 15,
            height: 15,
            transform: "rotate(45deg)",
            top: 3.5,
            left: -4,
            bgcolor: "#40AA41",
          },
        }}
      >
        <Typography fontWeight="bold" fontSize="18px">
          Tên giao dịch: {tenGiaoDich}
        </Typography>
        <Box my={1}>
          <Box component="span" fontSize="17px" fontWeight="bold">
            Người mua:{" "}
          </Box>
          <Box component="span" fontSize="17px">
            {nguoiMua}
          </Box>
        </Box>
        <Box my={1}>
          <Box component="span" fontSize="17px" fontWeight="bold">
            Người bán:{" "}
          </Box>
          <Box component="span" fontSize="17px">
            {nguoiBan}
          </Box>
        </Box>
        <Box my={1}>
          <Box component="span" fontSize="17px" fontWeight="bold">
            Số lượng:{" "}
          </Box>
          <Box component="span" fontSize="17px">
            {soLuong}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box mt={4}>
      <CustomTimeline>
        <CustomTimeLineItem time={tracking.productTransaction.time}>
          {render(
            tracking.productTransaction.name,
            tracking.productTransaction.buyer,
            tracking.productTransaction.saler,
            tracking.productTransaction.quantity,
            3
          )}
        </CustomTimeLineItem>
        <CustomTimeLineItem time={tracking.riceTransaction.time}>
        {render(
            tracking.riceTransaction.name,
            tracking.riceTransaction.buyer,
            tracking.riceTransaction.saler,
            tracking.riceTransaction.quantity,
            2
          )}
        </CustomTimeLineItem>
        <RiceDetail isShow={isShowRiceDetail}></RiceDetail>
      </CustomTimeline>
    </Box>
  );
};

export default RiceTimeLine;
