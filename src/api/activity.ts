import { ADDACTIVITY } from "../model";
import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const activityApi = {
  getAll(params: ListParams) {
    const url = "hoatdongmuavu/get-list";
    return axiosClient.get(url, { params });
  },

  create(data: ADDACTIVITY) {
    const url = "hoatdongmuavu/create";
    return axiosClient.post(url, data);
  },
};

export default activityApi;
