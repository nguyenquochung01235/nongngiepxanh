import { ListParams } from "../model";
import { AddCalendar } from "./../model/calendar";
import axiosClient from "./axiosClient";

const calendarApi = {
  getAll(params: ListParams) {
    const url = "lichmuavu/get-list";
    return axiosClient.get(url, { params });
  },

  createCalendar(data: AddCalendar) {
    const url = "lichmuavu/create";
    return axiosClient.post(url, data);
  },

  updateCalendar(data: AddCalendar) {
    const url = "lichmuavu/update";
    return axiosClient.post(url, data);
  },

  getDetail(params: ListParams) {
    const url = "lichmuavu/get-detail";
    return axiosClient.get(url, { params });
  },
};

export default calendarApi;
