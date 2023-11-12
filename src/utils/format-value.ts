import { coverDateNumberToString, formatNumber } from "./index";

export const formatValue = (value: any, type?: "number" | "date" | "percent") => {
  if (!value && type !== "number" && type !== "percent") {
    return "-";
  }
  switch (type) {
    case "date":
      return coverDateNumberToString(value);
    case "number":
      return formatNumber(value);
    case "percent":
      return `${value ?? 0}%`;
    default:
      return value;
  }
};

export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(amount);
}
