import axiosClient from "./axiosClient";

const storyApi = {
  getAll(id: string | number, params: any) {
    const url = `nhatkydongruong/get-list/${id}`;
    return axiosClient.get(url, { params });
  },

  getDetail(id: string | number | undefined) {
    const url = `nhatkydongruong/get-detail/${id}`;
    return axiosClient.get(url);
  },

  createActivity(data: any) {
    const url = "nhatkydongruong/create";
    return axiosClient.post(url, data);
  },

  updateStatus(id: string | number) {
    const url = `nhatkydongruong/make-done/${id}`;
    return axiosClient.put(url);
  },

  update(data: any, id: string | number) {
    const url = `nhatkydongruong/update/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id: string | number) {
    const url = `nhatkydongruong/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default storyApi;
