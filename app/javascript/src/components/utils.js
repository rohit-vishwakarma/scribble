import dayjs from "dayjs";

export const formatTimeStampToDate = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");

export const formatTimeStampToTimeAndDate = dateTime =>
  dayjs(dateTime).format("hh:mm A, DD/MM/YYYY");

export const formatTimeStampToDateWithHyphen = dateTime =>
  dayjs(dateTime).format("DD-MM-YYYY");
