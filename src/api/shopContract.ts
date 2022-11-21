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
};

export default shopContractApi;
