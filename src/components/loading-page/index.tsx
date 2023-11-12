import { LoadingPageWrapper } from "./styled";
import { Spinner } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { Flex } from "styles/common";

interface LoadingFixedProps {
  loading?: boolean;
}
const Portal = dynamic(() => import("components/portal"), { ssr: false });

const LoadingPage = ({ loading }: LoadingFixedProps) => {
  return loading ? (
    <Portal>
      <LoadingPageWrapper>
        <Flex justify="center" align="center" className="fixed">
          <Spinner color="indigo" />
        </Flex>
      </LoadingPageWrapper>
    </Portal>
  ) : null;
};

export default LoadingPage;
