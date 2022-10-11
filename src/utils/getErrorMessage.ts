import { message } from "antd";

export const getErrorMessage = (err: any) => {
  const mgsList = err.response.data?.errorList || [];
  return mgsList.map((mgs: any) => {
    message.error(mgs);
  });
};
