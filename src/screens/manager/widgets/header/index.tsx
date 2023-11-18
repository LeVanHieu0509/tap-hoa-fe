import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { setOpenConfigurator, useMaterialTailwindController } from "screens/manager/context";
import { Configurator, DashboardNavbar } from "../layout";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [dispatch] = useMaterialTailwindController();

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
