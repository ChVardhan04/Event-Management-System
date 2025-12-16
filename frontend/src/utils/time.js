import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export const toLocalInput = (utcDate, timezone) =>
  dayjs.utc(utcDate).tz(timezone).format("YYYY-MM-DDTHH:mm");

export const pretty = (utcDate, timezone) =>
  dayjs.utc(utcDate).tz(timezone).format("MMM DD, YYYY hh:mm A");
