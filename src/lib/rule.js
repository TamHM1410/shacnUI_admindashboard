export const NUMBER_OF_PROOF_IMAGES = 2;
export const HOURS_FORMAT_PATTERN = "HH:mm";
export const VN_DATE_FORMAT_PATTERN = "DD/MM/YYYY";
export const VN_TIME_DATE_FORMAT_PATTERN = `${HOURS_FORMAT_PATTERN}, ${VN_DATE_FORMAT_PATTERN}`;
export const PHONE_NUMBER_MAX_LENGTH = 11;
export const PHONE_NUMBER_MIN_LENGTH = 9;
export const PHONE_NUMBER_PATTERN = /(\d{4})(\d{3})(\d{3})/;
export const PASSWORD_PATTERN =
  /^(?!.*(\s))(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{6,})/;
export const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const CODE_PATTERN = /^[a-zA-Z][0-9]*$/;
export const DEFAULT_QUERY_PAGE_SIZE = 25;
export const MAX_ATTACHMENT_NUMBER = 3;