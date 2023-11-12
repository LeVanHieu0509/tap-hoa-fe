import React from "react";
import { AdminLayoutWrapper } from "./styled";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  // const router = useRouter();
  // const { data, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {},
  // });

  // useEffect(() => {
  //   //logined
  //   if (!data?.user?.operation && status === "authenticated") {
  //     router.push("/");
  //     signOut({ redirect: false });
  //     localStorage.removeItem(`state:${p.name}:phe-sub`);

  //     Alert("ERROR", "Lỗi xác thực. Vui lòng đăng nhập lại!");
  //   }

  //   if (isNull(data)) {
  //     router.push("/");
  //   }
  // }, [data]);

  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
};

export default AdminLayout;
