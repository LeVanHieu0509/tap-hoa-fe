import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, DashboardNavbar, Configurator, Footer } from "screens/manager/widgets/layout";
import { useMaterialTailwindController, setOpenConfigurator } from "screens/manager/context";
import { Home, Notifications, Profile, Tables } from "../pages/dashboard";
import { useMemo } from "react";
import { useRouter } from "next/router";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { pathname } = useRouter();

  const Content = useMemo(() => {
    switch (pathname) {
      case "/manager/tong-quan":
        return Home;
      case "/manager/quan-ly-hoa-don":
        return Notifications;
      case "/manager/quan-ly-san-pham":
        return Tables;
      case "/manager/quan-ly-thanh-toan":
        return Profile;

      default:
        return Home;
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"} />

      <div className="p-4 xl:ml-80">
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

          <Content />
          <div className="text-blue-gray-600">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
