import { Trader } from "../model/trader";
import { ListParams, ListResponse } from "./../model/common";
import axiosClient from "./axiosClient";

const commontApi = {
  getAll(url: string, params: ListParams): Promise<ListResponse<any>> {
    return axiosClient.get(url, { params });
  },

  create(url: string, data: ListParams): Promise<ListResponse<any>> {
    return axiosClient.post(url, data);
  },
};

export default commontApi;
