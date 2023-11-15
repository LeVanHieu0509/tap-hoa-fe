export const CURRENT_USER = "currentUser";
export const CACHE = "cache";

import { BellIcon, LockOpenIcon, PlusCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

export const listSidenav = [
  {
    title: "Tổng quan",
    href: "/manager",
    role: ["ADMIN"],
    icon: BellIcon,
  },
  {
    title: "Quản lý sản phẩm",
    href: "/manager/quan-ly-san-pham",
    role: ["ADMIN"],
    icon: ShoppingCartIcon,
  },
  {
    title: "Quản lý hoá đơn",
    href: "/manager/quan-ly-hoa-don",
    role: ["ADMIN", "EMPLOYEE"],
    icon: PlusCircleIcon,
  },

  {
    title: "Quản lý nhân viên",
    href: "/manager/quan-ly-nhan-vien",
    role: ["ADMIN"],
    icon: LockOpenIcon,
  },
  //   {
  //     title: "Trang cá nhân",
  //     href: "/manager/trang-ca-nhan",
  //     role: ["ADMIN", "EMPLOYEE"],
  //     icon: BanknotesIcon,
  //   },
  //   {
  //     title: "Quản lý thanh toán",
  //     href: "/manager/quan-ly-thanh-toan",
  //     role: ["ADMIN", "EMPLOYEE"],
  //     icon: CreditCardIcon,
  //   },
  //   {
  //     title: "Quản lý khách hàng",
  //     href: "/manager/quan-ly-khach-hang",
  //     role: ["ADMIN", "EMPLOYEE"],
  //     icon: BanknotesIcon,
  //   },
];
