// const { publicRuntimeConfig } = getConfig();
// const { name } = publicRuntimeConfig.site;

import LoadingPage from "components/loading-page";
import useRedirect from "hooks/use-redirect";

const Home = () => {
  useRedirect("/manager");

  return <LoadingPage loading={true} />;
};

export default Home;
