import { ListParams } from "../model/common";
import axiosClient from "./axiosClient";

const postApi = {
  getAll(params: any) {
    const url = "post/get-list";
    return axiosClient.get(url, params);
  },

  getMyPost(params: any) {
    const url = "post/get-list/user";
    return axiosClient.get(url, params);
  },

  getDetail(id: any) {
    const url = `post/get-detail/${id}`;
    return axiosClient.get(url);
  },

  create(data: any) {
    const url = "post/create";
    return axiosClient.post(url, data);
  },

  delete(id: string | number) {
    const url = `/post/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default postApi;
