import { useTheme } from "styled-components";
import IconClose from "./source/close";
import Tick from "./source/tick";

const IconComponent = {
  close: IconClose,
  tick: Tick,
};

export interface IconProps {
  size?: string | number;
  color?: string;
  fill?: string;
}

export type IconType = keyof typeof IconComponent;

interface IconsProps extends IconProps {
  icon: IconType;
  size?: number;
}

const Icons = ({ icon, color, ...res }: IconsProps) => {
  const Icon = IconComponent[icon];
  const theme = useTheme();
  const colorObj = theme.color.status as any;
  if (!Icon) return null;
  return <Icon {...res} color={colorObj[color] || color} />;
};

export default Icons;
