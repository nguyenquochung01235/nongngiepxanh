import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const supplierApi = {
  getAll(params: any) {
    const url = `category-vattu/get-list`;
    return axiosClient.get(url, { params });
  },

  getDetail(id: any) {
    const url = `category-vattu/get-detail/${id}`;
    return axiosClient.get(url);
  },

  add(data: any) {
    const url = "category-vattu/create";
    return axiosClient.post(url, data);
  },

  update(id: any, data: any) {
    const url = `category-vattu/update/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id: string | number) {
    const url = `category-vattu/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default supplierApi;
