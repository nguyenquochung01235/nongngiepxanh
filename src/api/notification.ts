import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const notificationApi = {
  getAll(params: ListParams) {
    const url = "notification";
    return axiosClient.get(url, { params });
  },
};

export default notificationApi;
