import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const contractApi = {
  searchUser(params: ListParams) {
    const url = "htx/search";
    return axiosClient.get(url, { params });
  },

  getListSeason(id: string | number) {
    const url = `lichmuavu/get-list-for-hdmb/${id}`;
    return axiosClient.get(url);
  },

  create(data: any) {
    const url = "thuonglai/create-hopdong";
    return axiosClient.post(url, data);
  },
};

export default contractApi;
