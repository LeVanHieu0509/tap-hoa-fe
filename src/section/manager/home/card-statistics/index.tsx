import { GetOverViewOutput } from "@custom-types/manager";
import { BanknotesIcon, ChartBarIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React, { useMemo } from "react";
import { StatisticsCard } from "screens/manager/widgets/cards";
import { formatNumber } from "utils";
import { formatCurrency } from "utils/format-value";

interface CardProps {
  data: GetOverViewOutput;
}

const CardStatistics = ({ data }: CardProps) => {
  const statisticsCardsData = useMemo(
    () => [
      {
        color: "blue",
        icon: BanknotesIcon,
        title: "Tổng doanh thu",
        value: formatCurrency(data?.totalRevenue),
        footer: {
          color: "text-green-500",
          value: "+55%",
          label: "so với tuần trước",
        },
      },
      {
        color: "orange",
        icon: ChartBarIcon,
        title: "Lợi nhuận",
        value: formatCurrency(data?.totalProfit),
        footer: {
          color: "text-green-500",
          value: "+5%",
          label: "so với ngày hôm qua",
        },
      },
      {
        color: "pink",
        icon: UserIcon,
        title: "Tổng hoá đơn",
        value: formatNumber(data?.quantityBills),
        footer: {
          color: "text-green-500",
          value: "+3%",
          label: "so với tháng trước",
        },
      },
      {
        color: "green",
        icon: UserPlusIcon,
        title: "Số lượng sản phẩm",
        value: formatNumber(data?.quantityProduct),

        footer: {
          color: "text-red-500",
          value: "-2%",
          label: "so với ngày hôm qua",
        },
      },
    ],
    [data]
  );

  return (
    <div className="mb-40 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {statisticsCardsData?.map(({ icon, title, footer, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          title={title}
          icon={React.createElement(icon, {
            className: "w-6 h-6 text-white",
          })}
          // footer={
          //   <Typography className="font-normal text-blue-gray-600">
          //     <strong className={footer.color}>{footer.value}</strong>
          //     &nbsp;{footer.label}
          //   </Typography>
          // }
        />
      ))}
    </div>
  );
};

export default CardStatistics;
