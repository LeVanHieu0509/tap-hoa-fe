import PulseLoader from "./pulse-loader";
import { LoadingWrapper } from "./styled";

interface LoadingFixedProps {
  loading: boolean;
  color?: string;
  isFullContent?: boolean;
}

const LoadingSection = ({ loading = true, color, isFullContent = false }: LoadingFixedProps) => {
  return loading ? (
    <LoadingWrapper isFullContent={isFullContent}>
      <PulseLoader loading color={color} />
    </LoadingWrapper>
  ) : null;
};

export default LoadingSection;
