import axiosClient from "./axiosClient";

const storyApi = {
  getAll(params: any) {
    const url = "nhatkydongruong/get-list";
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
