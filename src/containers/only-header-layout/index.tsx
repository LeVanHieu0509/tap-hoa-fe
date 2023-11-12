import React from "react";
import { OnlyHeaderLayoutWrapper } from "./styled";
import Navbar from "../../components/header";

interface OnlyHeaderLayoutProps {
  children: React.ReactNode;
}

const OnlyHeaderLayout = ({ children }: OnlyHeaderLayoutProps) => {
  return (
    <OnlyHeaderLayoutWrapper>
      <Navbar />
      {children}
    </OnlyHeaderLayoutWrapper>
  );
};

export default OnlyHeaderLayout;
