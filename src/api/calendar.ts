import { ListParams } from "../model";
import { AddCalendar } from "./../model/calendar";
import axiosClient from "./axiosClient";

const calendarApi = {
  getAll() {
    const url = "lichmuavu/get-list?id_hoptacxa=52&page=1&limit=15";
    return axiosClient.get(url);
  },

  createCalendar(data: AddCalendar) {
    const url = "lichmuavu/create";
    return axiosClient.post(url, data);
  },

  getDetail(params: ListParams) {
    const url = "lichmuavu/get-detail";
    return axiosClient.get(url, { params });
  },
};

export default calendarApi;
