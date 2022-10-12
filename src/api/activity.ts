import { ADDACTIVITY, ListActivity } from "../model";
import { ListParams, ListResponse } from "./../model/common";
import axiosClient from "./axiosClient";

const activityApi = {
  getAll(params: ListParams): Promise<ListResponse<ListActivity>> {
    const url = "hoatdongmuavu/get-list";
    return axiosClient.get(url, { params });
  },

  create(data: ADDACTIVITY): Promise<ADDACTIVITY> {
    const url = "hoatdongmuavu/create";
    return axiosClient.post(url, data);
  },
};

export default activityApi;
