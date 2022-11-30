import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tracingApi from "../../../../../api/tracing";
import { ITruyXuatNguonGoc } from "../../../../../model/tracking-tracing";
import RiceInformation from "./components/RiceInformation";
import RiceTimeLine from "./components/RiceTimeLine";

const TrackingPage = () => {
  const [data, setData] = useState<ITruyXuatNguonGoc>();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const data = await tracingApi.getChiTietLoHang(params.id || "");
      if(data.status === 200) {
        setData(data.data)
      }
    })();
  }, []);

  return (
    <Box width="80%" m="0 auto">
      <RiceInformation product={data?.giaodichmubanlua}></RiceInformation>
      <RiceTimeLine lohang={data}></RiceTimeLine>
    </Box>
  );
};

export default TrackingPage;
