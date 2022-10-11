import { Moment } from "moment";
export const formatMoment = (date: Moment) => {
  return date.format("YYYY-MM-DD");
};
