import { Box, Collapse, Typography } from "@mui/material";
import React from "react";
import { CustomTimeLineItem } from "../../../../../../components/time-line";
import { ISeasonActivity } from "../../../../../../model/seasonActivity";
import { ISupplies } from "../../../../../../model/supplies";

export interface IRiceDetail {
  isShow?: boolean;
}

const detailItems: ISeasonActivity[] = [
  {
    tenHoatDong: 'Bon Phan dot 1',
    thoigian: '22/10/2022',
    danhsachVatTu: [
      {
        tenVatTu: 'Kali',
        tenGiaoDich: 'Giao Dich Mua Ban Kali',
        soLuong: 20,
        thoiGianGiaoDich: '22/10/2022'
      },
      {
        tenVatTu: 'Ure',
        tenGiaoDich: 'Giao Dich Mua Ban Ure',
        soLuong: 20,
        thoiGianGiaoDich: '22/10/2022'
      },
      {
        tenVatTu: 'Natri',
        tenGiaoDich: 'Giao Dich Mua Ban Natri',
        soLuong: 20,
        thoiGianGiaoDich: '22/10/2022'
      },
    ]
  },
  {
    tenHoatDong: 'Bon Phan dot 2',
    thoigian: '22/10/2022',
    danhsachVatTu: [
      {
        tenVatTu: 'Kali',
        tenGiaoDich: 'Giao Dich Mua Ban Kali',
        soLuong: 20,
        thoiGianGiaoDich: '22/10/2022'
      },
      {
        tenVatTu: 'Ure',
        tenGiaoDich: 'Giao Dich Mua Ban Ure',
        soLuong: 20,
        thoiGianGiaoDich: '22/10/2022'
      },
      {
        tenVatTu: 'Natri',
        tenGiaoDich: 'Giao Dich Mua Ban Natri',
        soLuong: 20,
        thoiGianGiaoDich: '22/10/2022'
      },
    ]
  }
];

const RiceDetail = ({ isShow }: IRiceDetail) => {
  const render = (tenHoatDong: string, danhsachVatTu: ISupplies[]) => {
    return (
      <Box
        width={600}
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
        {danhsachVatTu.map((v, idx) => {
          return (
            <React.Fragment key={idx}>
              <Box my={1}>
                <Box component="span" fontSize="17px" fontWeight="bold">
                  Tên Vật Tư:{" "}
                </Box>
                <Box component="span" fontSize="17px">
                  {v.tenVatTu}
                </Box>
              </Box>
              <Box my={1}>
                <Box component="span" fontSize="17px" fontWeight="bold">
                  Số lượng:{" "}
                </Box>
                <Box component="span" fontSize="17px">
                  {v.soLuong}
                </Box>
              </Box>
              <Box my={1}>
                <Box component="span" fontSize="17px" fontWeight="bold">
                  Tên giao dịch:{" "}
                </Box>
                <Box component="span" fontSize="17px">
                  {v.tenGiaoDich}
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
      {detailItems.map((di, idx) => {
        return (
          <CustomTimeLineItem
            key={idx}
            dotColor="#02B68C"
            connectorColor="#02B68C"
            time={di.thoigian}
          >
            {render(di.tenHoatDong, di.danhsachVatTu)}
          </CustomTimeLineItem>
        );
      })}
    </Collapse>
  );
};

export default RiceDetail;
