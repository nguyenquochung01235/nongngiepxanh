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

  updateCalendar(data: AddCalendar, id: string | number) {
    const url = `lichmuavu/update/${id}`;
    return axiosClient.put(url, data);
  },

  getDetail(id: string | undefined) {
    const url = `lichmuavu/get-detail/${id}`;
    return axiosClient.get(url);
  },
};

export default calendarApi;
