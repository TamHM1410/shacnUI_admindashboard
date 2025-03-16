import dayjs from "dayjs";
import { HOURS_FORMAT_PATTERN, PHONE_NUMBER_PATTERN, VN_DATE_FORMAT_PATTERN, VN_TIME_DATE_FORMAT_PATTERN } from "@/lib/rule";

export const displayValue = (value) => {
    return value || "-";
}

export const displayTime = (time, format = HOURS_FORMAT_PATTERN) => {
    return time ? dayjs(time).format(format) : "-";
}

export const displayDate = (date, format = VN_DATE_FORMAT_PATTERN) => {
    return date ? dayjs(date).format(format) : "-";
}

export const displayDateTime = (date, format = VN_TIME_DATE_FORMAT_PATTERN) => {
    return date ? dayjs(date).format(format) : "-";
}

export const displayPhone = (
    phoneNumber
  ) => {
    if (phoneNumber === undefined || phoneNumber === null) {
      return "-";
    }
    const cleanedPhoneNumber = phoneNumber.toString().replace(/\D/g, "");
    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      PHONE_NUMBER_PATTERN,
      "$1 $2 $3"
    );
    return formattedPhoneNumber;
};

  export const displayNumber = (
    number
  ) => {
    if (!number) return "0";
    const num =
      typeof number === "string" ? parseInt(number.toString(), 10) : number;
    return num?.toLocaleString("en-US");
};

  export const displayDimension = (dimension) => {
    if (!dimension) return "-";
    return `${dimension?.length} x ${dimension?.width} x ${dimension?.height}`;
  };

