import {message} from 'antd'
export const getResponseMessage = (res: any) => {
  return message.success(res?.message || "");
};
