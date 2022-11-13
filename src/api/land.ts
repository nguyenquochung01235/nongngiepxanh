import { ListParams } from "../model/common";
import axiosClient from "./axiosClient";

const landApi = {
  getAll(params: any) {
    const url = "thuadat/get-list";
    return axiosClient.get(url, params);
  },

  create(data: any) {
    const url = "thuadat/create";
    return axiosClient.post(url, data);
  },

  active(id: string | number) {
    const url = `thuadat/active/${id}`;
    return axiosClient.put(url);
  },

  update(data: any, id: string | number) {
    const url = `thuadat/update/${id}`;
    return axiosClient.post(url, data);
  },

  delete(id: string | number) {
    const url = `thuadat/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default landApi;
