import { ADDACTIVITY, ListActivity } from "../model";
import { ListParams, ListResponse } from "./../model/common";
import axiosClient from "./axiosClient";

const activityApi = {
  getAll(params: ListParams): Promise<ListResponse<ListActivity>> {
    const url = "hoatdongmuavu/get-list";
    return axiosClient.get(url, { params });
  },

  getDetail(id: number | string) {
    const url = `/hoatdongmuavu/get-detail/${id}`;
    return axiosClient.get(url);
  },

  create(data: ADDACTIVITY): Promise<ListResponse<ADDACTIVITY>> {
    const url = "hoatdongmuavu/create";
    return axiosClient.post(url, data);
  },

  update(data: ADDACTIVITY): Promise<ListResponse<ADDACTIVITY>> {
    const url = "hoatdongmuavu/update";
    return axiosClient.put(url, data);
  },

  delete(id: string): Promise<void> {
    const url = `hoatdongmuavu/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default activityApi;
