import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { setOpenConfigurator, useMaterialTailwindController } from "screens/manager/context";
import { Configurator, DashboardNavbar } from "../layout";

interface HeaderProps {
  className?: string;
  type?: string;
}

const Header = ({ type, className }: HeaderProps) => {
  return (
    <div className={className}>
      <DashboardNavbar />
      <Configurator />
    </div>
  );
};

export default Header;
