import axiosClient from "./axiosClient";

const shopContractApi = {
  searchUser(data: any) {
    const url = "xavien/search-by-phone-number";
    return axiosClient.post(url, data);
  },

  getDetail(id: any) {
    const url = `/giaodichmuabanluagiong/get-detail/${id}`;
    return axiosClient.get(url);
  },

  create(data: any) {
    const url = "giaodichmuabanluagiong/create";
    return axiosClient.post(url, data);
  },

  update(data: any, id: string | number) {
    const url = `giaodichmuabanluagiong/update/${id}`;
    return axiosClient.post(url, data);
  },

  confirm(id: string | number) {
    const url = `giaodichmuabanluagiong/confirm/${id}`;
    return axiosClient.put(url);
  },

  approve(data: any, id: string | number) {
    const url = `giaodichmuabanluagiong/approve/${id}`;
    return axiosClient.put(url, data);
  },
};

export default shopContractApi;
