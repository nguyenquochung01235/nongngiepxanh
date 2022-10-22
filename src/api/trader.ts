import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const traderApi = {
  getDetail() {
    const url = "thuonglai/get-detail";
    return axiosClient.get(url);
  },
};

export default traderApi;
