import moment from "moment";
import { DATE_FORMAT } from "../enum";

export const convertToMoment = (data: any[]) => {
  if (data && data.length > 0) {
    let obj: any = {};

    data.forEach((item: any) => {
      obj[item["key"]] = moment(item["value"], DATE_FORMAT);
    });
    return obj;
  } else {
    return [];
  }
};
