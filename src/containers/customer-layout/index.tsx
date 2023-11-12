// import { NavbarWrapper } from "components/admin/navbar";
// import SidebarWrapper from "components/admin/sidebar";
// import LoadingPage from "components/loading-page";

import React from "react";
import { ContentWrapper, CustomerLayoutWrapper } from "./styled";
import Navbar from "../../components/header";
import Footer from "../../components/footer";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  // const router = useRouter();
  // const { status, data } = useSession({
  //   required: true,
  //   onUnauthenticated() {},
  // });

  // useEffect(() => {
  //   //logined
  //   if (data?.user?.operation && status === "authenticated") {
  //     router.push("/");
  //     signOut({ redirect: false });
  //     localStorage.removeItem(`state:${p.name}:phe-sub`);

  //     Alert("ERROR", "Lỗi xác thực. Vui lòng đăng nhập lại!");
  //   }

  //   if (isNull(data)) {
  //     router.push("/");
  //   }
  // }, [data]);

  return (
    <>
      <CustomerLayoutWrapper>
        <Navbar />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer />
      </CustomerLayoutWrapper>
    </>
  );
};

export default CustomerLayout;
