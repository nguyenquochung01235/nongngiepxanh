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

  getDetail(id: string | number) {
    const url = `hopdongmuaban/get-detail/${id}`;
    return axiosClient.get(url);
  },

  update(data: any, id: string | number) {
    const url = `hopdongmuaban/update/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id: string | number) {
    const url = `hopdongmuaban/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default contractApi;
