import { Box, Collapse, Typography } from "@mui/material";
import React from "react";
import { CustomTimeLineItem } from "../../../../../../components/time-line";
import { IHoatDongNhatKy, IVatTu } from "../../../../../../model/tracking-tracing";

export interface IRiceDetail {
  isShow?: boolean;
  nhatkyhoatdong?:  IHoatDongNhatKy[]
}



const RiceDetail = ({ isShow, nhatkyhoatdong }: IRiceDetail) => {
  const render = (tenHoatDong: string, danhsachVatTu?: IVatTu[]) => {
    return (
      <Box
        bgcolor="#02B68C"
        color="#ffffff"
        p={2}
        borderRadius={1}
        sx={{
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
            bgcolor: "#02B68C",
          },
        }}
      >
        <Typography fontWeight="bold" fontSize="18px">
          Tên hoạt động: {tenHoatDong}
        </Typography>
        {danhsachVatTu?.map((v, idx) => {
          return (
            <React.Fragment key={idx}>
              <Box my={1}>
                <Box component="span" fontSize="17px" fontWeight="bold">
                  Tên Vật Tư:{" "}
                </Box>
                <Box component="span" fontSize="17px">
                  {v.name_category_vattu + ' ' + v.id_vattusudung}
                </Box>
              </Box>
              <Box my={1}>
                <Box component="span" fontSize="17px" fontWeight="bold">
                  Số lượng:{" "}
                </Box>
                <Box component="span" fontSize="17px">
                  {v.soluong}
                </Box>
              </Box>
              <Box my={1}>
                <Box component="span" fontSize="17px" fontWeight="bold">
                  Danh mục:{" "}
                </Box>
                <Box component="span" fontSize="17px">
                  {v.name_category_vattu}
                </Box>
              </Box>
              <Box my={1} textAlign='justify'>
                <Box component="span" fontSize="17px" fontWeight="bold">
                  Tên giao dịch:{" "}
                </Box>
                <Box component="span" fontSize="17px">
                  {"Giao dịch mua bán vật tư " + v.id_giaodichmuaban_vattu + " " + v.created_at}
                </Box>
              </Box>
              <br />
            </React.Fragment>
          );
        })} 
      </Box>
    );
  };

  return (
    <Collapse in={isShow} timeout={1000}>
      {nhatkyhoatdong?.map((di, idx) => {
        return (
          <CustomTimeLineItem
            key={idx}
            dotColor="#02B68C"
            connectorColor="#02B68C"
            time={di.date_start}
          >
            {render(di.name_hoatdong, di.vattusudung.length > 0 ? di.vattusudung : undefined)}
          </CustomTimeLineItem>
        );
      })}
    </Collapse>
  );
};

export default RiceDetail;
