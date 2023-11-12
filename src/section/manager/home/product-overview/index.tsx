import { CheckIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader, Progress, Typography } from "@material-tailwind/react";
import { projectsTableData } from "screens/manager/data";
import { FlexColumn } from "styles/common";

interface ProductOverviewProps {}

const ProductOverview = ({}: ProductOverviewProps) => {
  return (
    <Card className="overflow-hidden xl:col-span-2">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6"
      >
        <FlexColumn>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Sản phẩm bán chạy
          </Typography>
          <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
            <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
            <strong>Đã bán được 30 sản phẩm</strong> trong tháng này
          </Typography>
        </FlexColumn>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Tên sản phẩm", "Số lượng đã bán", "Số lượng tồn kho", "Phần trăm"].map((el) => (
                <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projectsTableData.map(({ img, name, quantity_sell, quantity_inventory, completion }, key) => {
              const className = `py-3 px-5 ${
                key === projectsTableData.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={name}>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-bold text-left">
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={className}>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {quantity_sell}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                      {quantity_inventory}
                    </Typography>
                  </td>
                  <td className={className}>
                    <div className="w-10/12">
                      <Typography variant="small" className="mb-1 block text-xs font-medium text-blue-gray-600">
                        {completion}%
                      </Typography>
                      <Progress
                        value={completion}
                        variant="gradient"
                        color={completion === 100 ? "green" : "blue"}
                        className="h-1"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default ProductOverview;
