import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const traderApi = {
  getDetail() {
    const url = "thuonglai/get-detail";
    return axiosClient.get(url);
  },

  searchUser(params: ListParams) {
    const url = "htx/search";
    return axiosClient.get(url, { params });
  },
};

export default traderApi;
