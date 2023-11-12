import { Typography } from "@material-tailwind/react";
import React from "react";
import { statisticsCardsData } from "screens/manager/data";
import { StatisticsCard } from "screens/manager/widgets/cards";

interface CardProps {}

const CardStatistics = ({}: CardProps) => {
  return (
    <div className="mb-40 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          title={title}
          icon={React.createElement(icon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className={footer.color}>{footer.value}</strong>
              &nbsp;{footer.label}
            </Typography>
          }
        />
      ))}
    </div>
  );
};

export default CardStatistics;
