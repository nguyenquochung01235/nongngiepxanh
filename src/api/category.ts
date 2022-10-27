import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const categoryApi = {
  getDetail(id: string | number) {
    const url = `danhmucquydinh/get-detail/${id}`;
    return axiosClient.get(url);
  },

  delete(id: string | number) {
    const url = `danhmucquydinh/delete/${id}`;
    return axiosClient.delete(url);
  },

  update(id: string | number | undefined, data: any) {
    const url = `danhmucquydinh/update/${id}`;
    return axiosClient.put(url, data);
  },
};

export default categoryApi;
