import axiosClient from "./axiosClient";

const commontApi = {
  getAll(url: string, params: any) {
    return axiosClient.get(url, { params });
  },

  create(url: string, data: any) {
    return axiosClient.post(url, data);
  },
};

export default commontApi;
