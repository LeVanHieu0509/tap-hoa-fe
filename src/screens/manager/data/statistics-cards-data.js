import { BanknotesIcon, UserPlusIcon, UserIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Tổng doanh thu",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "so với tuần trước",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Lợi nhuận",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "so với ngày hôm qua",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Tổng hoá đơn",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "so với tháng trước",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Số lượng sản phẩm",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "so với ngày hôm qua",
    },
  },
];

export default statisticsCardsData;
