import { XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, IconButton, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { setOpenSidenav, useMaterialTailwindController } from "screens/manager/context";

import { listSidenav } from "@constants";
import React from "react";

interface SidenavProps {
  brandImg: String;
  brandName?: String;
}

export function Sidenav({
  brandImg = `${process.env.basePath}/public/img/logo-ct.png`,
  brandName = "TẠP HOÁ JUN BF",
}: SidenavProps) {
  const router = useRouter();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"}`}>
        <Link href="/manager" className="flex items-center gap-4 py-6 px-8">
          <Avatar
            size="sm"
            src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/logo-ct.png"
            className=""
            variant="square"
          />

          <Typography variant="h6" color={sidenavType === "dark" ? "white" : "blue-gray"}>
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-4">
          {listSidenav.map((item, key) => (
            <li key={key}>
              <Link href={item.href}>
                <Button
                  variant={item.href == router.pathname ? "gradient" : "text"}
                  color={item.href == router.pathname ? sidenavColor : sidenavType === "dark" ? "white" : "blue-gray"}
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  {React.createElement(item.icon, {
                    className: `!w-5 !h-5`,
                  })}
                  <Typography variant="h6" color="inherit" className="font-medium capitalize">
                    {item.title}
                  </Typography>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidenav;
