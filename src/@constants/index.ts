export const CURRENT_USER = "currentUser";
export const CACHE = "cache";

import {
  CreditCardIcon,
  GlobeAmericasIcon,
  HomeIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export const listSidenav = [
  {
    title: "Tổng quan",
    href: "/manager",
    role: ["ADMIN"],
    icon: HomeIcon,
  },
  {
    title: "Tạo hoá đơn",
    href: "/manager/tao-hoa-don",
    role: ["ADMIN", "EMPLOYEE"],
    icon: PlusCircleIcon,
  },
  {
    title: "Quản lý sản phẩm",
    href: "/manager/quan-ly-san-pham",
    role: ["ADMIN"],
    icon: GlobeAmericasIcon,
  },

  {
    title: "Quản lý hoá đơn",
    href: "/manager/quan-ly-hoa-don",
    role: ["ADMIN", "EMPLOYEE"],
    icon: ShoppingCartIcon,
  },
  {
    title: "Quản lý thanh toán",
    href: "/manager/quan-ly-thanh-toan",
    role: ["ADMIN", "EMPLOYEE"],
    icon: CreditCardIcon,
  },
  {
    title: "Quản lý nhân viên",
    href: "/manager/quan-ly-nhan-vien",
    role: ["ADMIN"],
    icon: UserCircleIcon,
  },

  //   {
  //     title: "Trang cá nhân",
  //     href: "/manager/trang-ca-nhan",
  //     role: ["ADMIN", "EMPLOYEE"],
  //     icon: BanknotesIcon,
  //   },

  //   {
  //     title: "Quản lý khách hàng",
  //     href: "/manager/quan-ly-khach-hang",
  //     role: ["ADMIN", "EMPLOYEE"],
  //     icon: BanknotesIcon,
  //   },
];

export const listMappingTopic = [
  { key: "quan-ly-nhan-vien", value: "nhân viên" },
  { key: "quan-ly-thanh-toan", value: "thanh toán" },
  { key: "quan-ly-khach-hang", value: "khách hàng" },
  { key: "quan-ly-san-pham", value: "sản phẩm" },
  { key: "quan-ly-hoa-don", value: "hoá đơn" },
];
