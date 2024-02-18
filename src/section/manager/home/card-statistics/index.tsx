import { GetOverViewOutput } from "@custom-types/manager";
import { BanknotesIcon, ChartBarIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { useAppSelector } from "hooks/use-redux";
import React, { useMemo } from "react";
import { StatisticsCard } from "screens/manager/widgets/cards";
import { formatNumber } from "utils";
import { formatCurrency } from "utils/format-value";

interface CardProps {
  data: GetOverViewOutput;
}

const CardStatistics = ({ data }: CardProps) => {
  const {
    loading: { getOverview },
  } = useAppSelector((r) => r.rootReducer);

  const statisticsCardsData = useMemo(
    () => [
      {
        color: "blue",
        icon: BanknotesIcon,
        title: "Tổng doanh thu",
        value: formatCurrency(data?.totalRevenue),
        footer: [
          {
            color: "text-green-500",
            value: formatCurrency(data?.overview.revenue.totalToday),
            label: "Hôm nay:",
          },
          {
            color: "text-green-500",
            value: formatCurrency(data?.overview.revenue.totalMonth),
            label: "Tháng này:",
          },
        ],
      },
      {
        color: "orange",
        icon: ChartBarIcon,
        title: "Tổng lợi nhuận",
        value: formatCurrency(data?.totalProfit),
        footer: [
          {
            color: "text-green-500",
            value: formatCurrency(data?.overview.profit.totalToday),
            label: "Hôm nay:",
          },
          {
            color: "text-green-500",
            value: formatCurrency(data?.overview.profit.totalMonth),
            label: "Tháng này:",
          },
        ],
      },
      {
        color: "pink",
        icon: UserIcon,
        title: "Tổng hoá đơn",
        value: formatNumber(data?.quantityBills),
        footer: [
          {
            color: "text-green-500",
            value: formatNumber(data?.overview.bills.totalToday),
            label: "Hôm nay:",
          },
          {
            color: "text-green-500",
            value: formatNumber(data?.overview.bills.totalMonth),
            label: "Tháng này:",
          },
        ],
      },
      {
        color: "green",
        icon: UserPlusIcon,
        title: "Số lượng sản phẩm",
        value: formatNumber(data?.quantityProduct),

        footer: [
          {
            color: "text-green-500",
            value: formatNumber(data?.overview.bills.totalToday),
            label: "Hôm nay đã bán:",
          },
          {
            color: "text-green-500",
            value: formatNumber(data?.overview.bills.totalMonth),
            label: "Tháng này đã bán:",
          },
        ],
      },
    ],
    [data]
  );

  return (
    <div className="mb-40 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      <>
        {statisticsCardsData?.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              footer && (
                <>
                  {footer.map((i, k) => (
                    <Typography key={k} className="font-normal text-blue-gray-600 m-0">
                      {i.label} &nbsp;<strong className={i.color}>{i.value}</strong>
                    </Typography>
                  ))}
                </>
              )
            }
          />
        ))}
      </>
    </div>
  );
};

export default CardStatistics;
