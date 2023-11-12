import { Alert } from "components/alert";
import { get, round } from "lodash";
import moment from "moment";

export const handleError = (
  e: any,
  defaultMessage = "Lỗi kết nối mạng. Quý khách vui lòng truy cập lại sau hoặc liên hệ Tổng đài Dịch vụ khách hàng 1800 96 96 90 (miễn cước) để được hỗ trợ nhanh kịp thời."
) => {
  if (!e?.isAxiosError) {
    Alert("ERROR", defaultMessage);
    return;
  }
  if (!e?.response) {
    Alert(
      "ERROR",
      "Lỗi kết nối mạng. Quý khách vui lòng truy cập lại sau hoặc liên hệ Tổng đài Dịch vụ khách hàng 1800 96 96 90 (miễn cước) để được hỗ trợ nhanh kịp thời."
    );
    return;
  }
  const status = get(e, "response.status");
  switch (status) {
    case 401: {
      Alert("ERROR", "Phiên đăng nhập đã hết hạn");
      break;
    }
    case 400:
    case 500:
    case 502:
    case 503:
    case 422: {
      Alert(
        "ERROR",
        "Lỗi kết nối mạng. Quý khách vui lòng truy cập lại sau hoặc liên hệ Tổng đài Dịch vụ khách hàng 1800 96 96 90 (miễn cước) để được hỗ trợ nhanh kịp thời."
      );
      break;
    }
    default: {
      Alert("ERROR", defaultMessage);
      break;
    }
  }
};

export const formatNumberTwoString = (stt: number) => {
  if (stt < 10) return stt.toString().length > 1 ? stt : "0" + stt.toString();
  return stt;
};

export const coverDateNumberToString = (date: any) => {
  if (date?.length < 10) {
    return date;
  }
  if (/[0-3][0-9]\/[0-1][0-9]\/[1-2]\d{3}/.test(date)) {
    return date;
  }
  if (date && moment(date).isValid()) {
    return moment(date).format("DD/MM/YYYY");
  }
  return date;
};

export const formatNumber = (num: number | string, minimumFractionDigits = 0) => {
  return !isNaN(+num)
    ? (+num)?.toLocaleString("de-DE", {
        minimumFractionDigits: minimumFractionDigits,
      })
    : "0";
};

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(
  //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|-|{|}|\||\\/g,
  //   ""
  // );
  return str;
};

export function validateEmail(email: string) {
  // var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var re = /^([a-zA-Z0-9_.-]*)@[a-zA-Z\-0-9]+(\.[a-zA-Z]{2,})+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Check valid date format DD/MM/YYYY
 * @param date {string | number} date
 * @returns {boolean} date is valid
 */
export const isValidDate = (date?: string): boolean => {
  if (!date || date?.length < 10) {
    return false;
  }
  return moment(date, "DD/MM/YYYY", true).isValid();
};

export const convertNameToCharacter = (name: string) => {
  const splitName = name?.split(" ");
  let fristCharacter = "";
  let lastCharacter = "";

  if (splitName?.length == 1) {
    lastCharacter = splitName?.pop();
  } else {
    fristCharacter = splitName?.shift().slice(0, 1);
    lastCharacter = splitName?.pop().slice(0, 1);
  }
  return fristCharacter + lastCharacter;
};

export const getDateFrom = (format?: string): string => {
  return moment()
    .startOf("month")
    .format(format ?? "DD/MM/YYYY");
};

export const getDateTo = (format?: string): string => {
  return moment().format(format ?? "DD/MM/YYYY");
};

export const calculatePercent = (number: number, total: number, max?: number, decimal = 0): number => {
  if (!number || !total) {
    return 0;
  }

  const percent = round((number / total) * 100, decimal);

  if (max) {
    return percent >= max ? max : percent;
  }

  return percent;
};

export const typeOnlyNumber = (text: string) => {
  let value = text.replace(/[^0-9]/g, "") + "";
  return value;
};

export const isIOS = () => {
  return (
    ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};
