import { Trader } from "../model/trader";
import { ListParams, ListResponse } from "./../model/common";
import axiosClient from "./axiosClient";

const commontApi = {
  getAll(url: string, params: ListParams): Promise<ListResponse<any>> {
    return axiosClient.get(url, { params });
  },

  create(url: string, data: any): Promise<ListResponse<any>> {
    return axiosClient.post(url, data);
  },

  update(url: string, data: any): Promise<ListResponse<any>> {
    return axiosClient.put(url, data);
  },

  autoComplete(type: string, params: ListParams) {
    const url = `/auto-complete/${type}/get-list`;
    return axiosClient.get(url, { params });
  },
};

export default commontApi;
