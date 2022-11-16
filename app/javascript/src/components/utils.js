import dayjs from "dayjs";

export const formatTimeStampToDate = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");

export const formatTimeStampToTimeAndDate = dateTime =>
  dayjs(dateTime).format("hh:mm A, DD/MM/YYYY");

export const calculateCreatedAgo = dateTime => dayjs(dateTime).fromNow();

export const formatTimeStampToDayDateAndTime = dateTime =>
  dayjs(dateTime).format("dddd MMMM DD, YYYY hh:mm A");
