import CardStatistics from "section/manager/home/card-statistics";
import ChartOverview from "section/manager/home/chart-overview";
import ProductOverview from "section/manager/home/product-overview";

export function Home() {
  return (
    <div className="mt-12">
      <CardStatistics />
      <ChartOverview />
      <ProductOverview />
      {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <OrderOverview />
      </div> */}
    </div>
  );
}

export default Home;
