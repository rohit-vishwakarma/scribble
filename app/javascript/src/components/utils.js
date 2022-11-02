import dayjs from "dayjs";

export const formatTimeStampToDate = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");

export const formatTimeStampToTimeAndDate = dateTime =>
  dayjs(dateTime).format("h:mm A, DD/MM/YYYY");
