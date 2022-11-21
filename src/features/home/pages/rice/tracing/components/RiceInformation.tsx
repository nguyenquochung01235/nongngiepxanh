import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { IRice } from "../../../../../../model/rice";

const rice: IRice = {
  name: "LUA",
  id: 1,
  description:
    "Lorem ipsum dolor sit amet, Sequi provident nisi ea! Minima consequatur veniam quos ex cumque quasi, hic similique, optio excepturi corrupti eaque?",
  price: 1000,
  image: "/images/bg-auth.webp",
  producer: "Nguyen Van A",
};

const RiceInformation = () => {
  return (
    <Grid container spacing={3} mt={4}>
      <Grid item xs={5}>
        <Box
          component="img"
          borderRadius={5}
          src={rice.image}
          width="100%"
        ></Box>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h5" fontWeight="bold" height={50}>
          {rice.name}
        </Typography>
        <Box my={1}>
          <Box component="span" fontSize="17px" fontWeight="bold">
            Hộ sản xuất:{" "}
          </Box>
          <Box component="span" fontSize="17px">
            {rice.producer}
          </Box>
        </Box>
        <Box my={1}>
          <Box component="span" fontSize="17px" fontWeight="bold">
            Giá bán:{" "}
          </Box>
          <Box component="span" fontSize="17px">
            {rice.price}
          </Box>
        </Box>
        <Box my={1} textAlign="justify">
          <Box component="span" fontSize="17px" fontWeight="bold">
            Mô tả:{" "}
          </Box>
          <Box component="span" fontSize="17px">
            {rice.description}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RiceInformation;
