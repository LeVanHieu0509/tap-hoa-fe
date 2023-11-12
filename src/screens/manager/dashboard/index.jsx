import CardStatistics from "section/manager/home/card-statistics";
import ChartOverview from "section/manager/home/chart-overview";
import ProductOverview from "section/manager/home/product-overview";

export function DashboardScreen() {
  return (
    <div className="mt-12">
      <CardStatistics />
      <ChartOverview />
      <ProductOverview />
    </div>
  );
}

export default DashboardScreen;
