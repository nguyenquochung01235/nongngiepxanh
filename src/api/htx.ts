import { ADDNEWUSER } from "./../model/user";
import { ADDHTX } from "../model";
import axiosClient from "./axiosClient";

const htxApi = {
  createHTX(data: ADDHTX) {
    const url = "/htx/create";
    return axiosClient.post(url, data);
  },

  searchUser(data: any) {
    const url = "xavien/search-by-phone-number";
    return axiosClient.post(url, data);
  },

  addNewMember(data: ADDNEWUSER) {
    const url = "htx/add-new-member";
    return axiosClient.post(url, data);
  },

  deleteUser(id: number) {
    const url = `htx/delete-member/${id}`;
    return axiosClient.delete(url);
  },

  toggleActive(id: string | number) {
    const url = `htx/update-active/${id}`;
    return axiosClient.put(url);
  },
};

export default htxApi;
