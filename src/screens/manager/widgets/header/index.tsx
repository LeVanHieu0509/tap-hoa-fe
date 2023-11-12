import React from "react";
import { Configurator, DashboardNavbar } from "../layout";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenConfigurator } from "screens/manager/context";
import { useRouter } from "next/router";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { pathname } = useRouter();

  return (
    <div className="w-full">
      <DashboardNavbar />
      <Configurator />
      <IconButton
        size="lg"
        color="white"
        className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
        ripple={false}
        onClick={() => setOpenConfigurator(dispatch, true)}
      >
        <Cog6ToothIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );
};

export default Header;
