import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "styles/theme";
import AdminLayout from "../admin-layout";
import BlankLayout from "../blank-layout";
import CustomerLayout from "../customer-layout";
import OnlyHeaderLayout from "../only-header-layout";

interface ThemeWrapperProps {
  children: React.ReactNode;
  component: React.ReactNode | any;
}

const ThemeWrapper = ({ children, component }: ThemeWrapperProps) => {
  const router = useRouter();
  const dispath = useDispatch();

  const Layout = useMemo(() => {
    if (router.pathname.startsWith("/customer")) {
      return CustomerLayout;
    }

    if (router.pathname.startsWith("/manager")) {
      return AdminLayout;
    }

    if (router.pathname.startsWith("/customer/cart")) {
      return OnlyHeaderLayout;
    }

    if ("/_error".includes(router.pathname)) {
      return Fragment;
    }

    return BlankLayout;
  }, [router.pathname]);

  useEffect(() => {
    dispath(rootAction.setInitialized(true));
    const listenter = function (ev: MouseEvent) {
      const button = ev.target as HTMLButtonElement;
      if (button.tagName === "BUTTON" && !button.disabled) {
        const clickable = button.dataset.clickable;
        if (clickable === "false") {
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }
        button.dataset.clickable = "false";
        button.style.pointerEvents = "none";
        setTimeout(() => {
          button.dataset.clickable = "true";
          button.style.pointerEvents = "";
        }, 300);
      }
    };
    document.addEventListener("click", listenter);
    return () => {
      document.removeEventListener("click", listenter);
    };
  }, []);

  return (
    <ThemeProvider theme={LightTheme}>
      <Head>
        <link rel="icon" href={`${process.env.basePath}/favicon.ico`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta name="theme-color" content={LightTheme.color.text.body} /> */}
        <meta name="description" content="E-Letter" />

        <title>Angels - Thiên đường sơn nails</title>
      </Head>
      {children}
      <Layout>{component}</Layout>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
