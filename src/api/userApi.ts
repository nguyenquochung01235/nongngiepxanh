import { SEARCHUSER } from "./../model/user";
import { ListParams } from "./../model/common";
import { IRegisterValues } from "../features/auth/register/components/register-form/RegisterForm";
import { IRoleOfUser, ListResponse, LoginPayload } from "../model";
import { User } from "../redux/userSlice";
import axiosClient from "./axiosClient";

const userApi = {
  getRoleOfUser(): Promise<ListResponse<IRoleOfUser>> {
    const url = "/service/get/account-type";
    return axiosClient.get(url);
  },

  login(data: LoginPayload): Promise<ListResponse<User>> {
    const url = "/login";
    return axiosClient.post(url, data);
  },

  register(data: IRegisterValues) {
    const url = "/service/create/user";
    return axiosClient.post(url, data);
  },

  getAllUser(params: ListParams) {
    const url = "xavien/get-list-xavien";
    return axiosClient.get(url, { params });
  },

  roleOfUser(role: string | undefined) {
    let url = "";
    if (role) {
      url = `xavien/role?type=${role}`;
    } else {
      url = `xavien/role`;
    }

    return axiosClient.get(url);
  },

  getDetail() {
    const url = "user/detail";
    return axiosClient.get(url);
  },

  updateUser(data: any) {
    const url = "user/update";
    return axiosClient.post(url, data);
  },
};

export default userApi;
