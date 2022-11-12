import axiosClient from "./axiosClient";

const storyApi = {
  getAll(id: string | number, params: any) {
    const url = `nhatkydongruong/get-list/${id}`;
    return axiosClient.get(url, { params });
  },

  createActivity(data: any) {
    const url = "nhatkydongruong/create";
    return axiosClient.post(url, data);
  },

  updateStatus(id: string | number) {
    const url = `nhatkydongruong/make-done/${id}`;
    return axiosClient.put(url);
  },

  delete(id: string | number) {
    const url = `nhatkydongruong/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default storyApi;
