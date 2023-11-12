import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { ProductProps } from "../../@custom-types";
import { formatNumber } from "utils";

export function EcommerceCard({ product }: { product?: ProductProps }) {
  return (
    <Card className="hover:shadow-xl mb-24" style={{ background: "#323232" }}>
      <CardHeader shadow={false} floated={false} className="h-96 relative ">
        <img
          style={{ height: "100%" }}
          src={product?.image}
          alt="card-image"
          className="rounded-lg h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </CardHeader>
      <CardBody>
        <div className=" mb-2 flex items-center justify-center">
          <Typography variant="h5" color="white" className="font-medium">
            {product?.title}
          </Typography>
        </div>

        <div className="flex items-center justify-center">
          <Typography color="white" className="font-medium mr-10">
            {formatNumber(product?.discountPrice)}đ
          </Typography>
          <Typography color="white" className="font-medium line-through">
            {formatNumber(product?.priceOrigin)}đ
          </Typography>
        </div>
        <div className="flex items-center justify-center">
          <Typography variant="small" color="white" className="font-normal opacity-75">
            {product?.description}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
