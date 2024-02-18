import { listSidenav } from "@constants";
import { GetOverViewOutput } from "@custom-types/manager";
import { getOverview } from "api/manager";
import { Alert } from "components/alert";
import useActionApi from "hooks/use-action-api";
import { useAppSelector } from "hooks/use-redux";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardStatistics from "section/manager/home/card-statistics";
import ProductOverview from "section/manager/home/product-overview";

export function DashboardScreen() {
  const router = useRouter();
  const [overviewData, setOverviewData] = useState<GetOverViewOutput>();
  const { currentUser } = useAppSelector((r) => r.rootReducer);

  const actionGetOverview = useActionApi(getOverview);

  useEffect(() => {
    if (currentUser) {
      const roles = listSidenav.find((item) => item.href == router.pathname)?.role;
      if (!roles.includes(currentUser?.user?.usr_roles)) {
        router.push("/manager/tao-hoa-don");
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      actionGetOverview(
        {
          data: 1,
        },
        {
          type: "local",
          name: "getOverview",
        }
      )
        .then(({ data }) => {
          if (data.status == "1") {
            setOverviewData(data.data);
          } else {
            Alert("ERROR", data.message);
          }
        })
        .catch((e) => console.log(get(e, "response.data.message")));
    }
  }, [currentUser]);

  return (
    <div className="mt-12">
      <CardStatistics data={overviewData} />
      {/* <ChartOverview /> */}
      <ProductOverview data={overviewData?.listAllProduct} />
    </div>
  );
}

export default DashboardScreen;
