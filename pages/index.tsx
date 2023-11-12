// const { publicRuntimeConfig } = getConfig();
// const { name } = publicRuntimeConfig.site;

import LoadingPage from "components/loading-page";
import useRedirect from "hooks/use-redirect";

const Home = () => {
  useRedirect("/quan-ly");

  return <LoadingPage loading={true} />;
};

export default Home;
