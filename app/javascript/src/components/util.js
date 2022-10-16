import dayjs from "dayjs";

export const formatTimeStampToDate = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");
