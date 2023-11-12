import { useRouter } from "next/router";
import React from "react";
import { MainLayoutWrapper } from "./styled";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useRouter();

  // const background = useMemo(() => {
  //   if (pathname === "/payment") {
  //     return "#ffffff";
  //   }
  // }, [pathname]);

  return <MainLayoutWrapper>{children}</MainLayoutWrapper>;
};

export default MainLayout;
