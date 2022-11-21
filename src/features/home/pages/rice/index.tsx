import { Box, Grid } from "@mui/material";
import React from "react";
import { IProduct } from "../../../../model/product";
import Card from "../../components/custom-cart/card";
import CustomPagination from "../../components/pagination/pagination";

const productItems: IProduct[] = [
  {
    id: 1,
    name: "Lua 1",
    description: "orem ipsum dolor sit amet, Sequi provident nisi ea! Minima consequatur veniam quos ex cumque quasi, hic similique, optio excepturi corrupti eaque?",
    image: "/images/bg-auth.webp",
  },
];

const RicePage = () => {
  return (
    <Box width="80%" m="30px auto">
      <Grid container spacing={3}>
        {productItems.map((p, idx) => {
          return (
            <Grid item xs>
              <Card
                href={`/g/rice/tracing/${p.id}`}
                name={p.name || ''}
                image={p.image || ''}
                description={p.description || ''}
              ></Card>
            </Grid>
          );
        })}
        <Grid item xs>
          <Box minWidth={250} maxWidth={305}></Box>
        </Grid>
        <Grid item xs>
          <Box minWidth={250} maxWidth={305}></Box>
        </Grid>
      </Grid>
      {/* <Box width="100%" display="flex" justifyContent="center" my={3}>
        <CustomPagination></CustomPagination>
      </Box> */}
    </Box>
  );
};

export default RicePage;
