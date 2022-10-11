import axiosClient from "./axiosClient";

const calendarApi = {
  getAll() {
    const url = "lichmuavu/get-list?id_hoptacxa=52&page=1&limit=15";
    return axiosClient.get(url);
  },

  createCalendar(data: any) {
    const url = "lichmuavu/create";
    return axiosClient.post(url, data);
  },

  getDetail(params: any) {
    const url = "lichmuavu/get-detail";
    return axiosClient.get(url, { params });
  },
};

export default calendarApi;
