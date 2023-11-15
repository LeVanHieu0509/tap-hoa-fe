import { useMaterialTailwindController } from "screens/manager/context";
import QuanLyKhachHangScreen from "screens/manager/quan-ly-khach-hang";
import Header from "screens/manager/widgets/header";
import { Footer, Sidenav } from "screens/manager/widgets/layout";

interface ManagerPageProps {}

const ManagerPage = ({}: ManagerPageProps) => {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"} />

      <div className="p-4 xl:ml-80">
        <div className="w-full">
          <Header />
          <QuanLyKhachHangScreen />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
