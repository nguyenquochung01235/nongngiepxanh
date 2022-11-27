import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { IProduct } from "../../../../../../model/tracking-tracing";

interface Props {
  product?: IProduct
}

const RiceInformation = ({product}: Props) => {
  return (
    <Grid container spacing={3} mt={4}>
      <Grid
        item
        xs={5}
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      >
        <Box
          component="img"
          borderRadius={5}
          src={product?.img_lohang || '/images/bg-auth.webp'}
          width="100%"
        ></Box>
      </Grid>
      <Grid item container xs={12} lg={7}>
        <Grid
          item
          xs={5}
          mr={3}
          sx={{
            display: {
              xs: "block",
              lg: "none",
              xl: "none",
            },
          }}
        >
          <Box
            component="img"
            borderRadius={5}
            src={product?.img_lohang || '/images/bg-auth.webp'}
            width="100%"
            height="100%"
            sx={{objectFit:'cover'}}
          ></Box>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" fontWeight="bold" mb={2} align='justify'>
            {product?.name_lohang}
          </Typography>
          <Box my={1}>
            <Box component="span" fontSize="17px" fontWeight="bold">
              Tên giống lúa:{" "}
            </Box>
            <Box component="span" fontSize="17px">
              {product?.name_gionglua}
            </Box>
          </Box>
          <Box my={1}>
            <Box component="span" fontSize="17px" fontWeight="bold">
              Tên hợp tác xã:{" "}
            </Box>
            <Box component="span" fontSize="17px">
              {product?.name_hoptacxa}
            </Box>
          </Box>
          <Box my={1}>
            <Box component="span" fontSize="17px" fontWeight="bold">
              Hộ sản xuất:{" "}
            </Box>
            <Box component="span" fontSize="17px">
              {product?.name_xavien}
            </Box>
          </Box>
          <Box mt={1}>
            <Box component="span" fontSize="17px" fontWeight="bold">
              Thương lái:{" "}
            </Box>
            <Box component="span" fontSize="17px">
              {product?.name_thuonglai}
            </Box>
          </Box>
          <Box mt={1} textAlign="justify">
            <Box component="span" fontSize="17px" fontWeight="bold">
              Mô tả:{" "}
            </Box>
            <Box component="span" fontSize="17px">
              {product?.description_giaodich}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RiceInformation;
