import { ListParams } from "./../model/common";
import axiosClient from "./axiosClient";

const riceApi = {
  autoCompleteRice(params: ListParams) {
    const url = "gionglua/get-list-gionglua";
    return axiosClient.get(url, { params });
  },
};

export default riceApi;
