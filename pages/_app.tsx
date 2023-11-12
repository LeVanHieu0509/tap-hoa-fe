import type { AppProps } from "next/app";

import "../src/styles/global.css";
import ThemeWrapper from "../src/containers/theme-wrapper";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { GlobalStyle } from "../src/styles/globals";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";
import { useEffect } from "react";
import moment from "moment-timezone";
import { default as version } from "../version.json";
import { MaterialTailwindControllerProvider } from "screens/manager/context";

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

            <ToastContainer />
          </ThemeWrapper>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
