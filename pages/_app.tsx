import type { AppProps } from "next/app";

import { ThemeProvider } from "@material-tailwind/react";
import moment from "moment-timezone";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MaterialTailwindControllerProvider } from "screens/manager/context";
import ThemeWrapper from "../src/containers/theme-wrapper";
import { store } from "../src/redux/store";
import "../src/styles/global.css";
import { GlobalStyle } from "../src/styles/globals";
import { default as version } from "../version.json";
import RootAppLoading from "components/root-app-loading";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.browser) {
      moment.tz.setDefault("Asia/Ho_Chi_Minh");
      console.log(`version-sma: #${version.build} (${version.date})`);
      const listener = () => {
        let vh = window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };
      listener();
      window.addEventListener("resize", listener);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <ThemeWrapper component={<Component {...pageProps} />}>
            <GlobalStyle />
            <RootAppLoading />
            <ToastContainer />
          </ThemeWrapper>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
