import { useRouter } from "next/router";
import { useEffect } from "react";
import { loadLocalItem } from "redux/store";
import { useMaterialTailwindController } from "screens/manager/context";
import { DashboardScreen } from "screens/manager/dashboard";

import Header from "screens/manager/widgets/header";
import { Footer, Sidenav } from "screens/manager/widgets/layout";

interface ManagerPageProps {}

const ManagerPage = ({}: ManagerPageProps) => {
  const router = useRouter();
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const currentUser = loadLocalItem("currentUser");

  useEffect(() => {
    if (currentUser?.user?.usr_roles !== "ADMINIE") {
      router.replace("/auth/sign-in");
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-blue-gray-50/50 w-full">
      <Sidenav brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"} />

      <div className="p-4 xl:ml-80">
        <div className="w-full  h-full">
          <Header />
          <DashboardScreen />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
