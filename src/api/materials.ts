import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const materialsApi = {
  getAll(params: ListParams) {
    const url = "giaodichmuabanluagiong/get-list";
    return axiosClient.get(url, { params });
  },
};

export default materialsApi;
