import { chunk } from "lodash";
import { ProductProps } from "@custom-types";
import { EcommerceCard } from "components/card";
import SlideFlashSale from "../flash-sale/slide";

interface Props {
  title: string;
  products: ProductProps[];
}

const Products = ({ title, products }: Props) => {
  return (
    <div className="py-6 sm:py-8 lg:py-6x text-white">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-24 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold border-gray-600 lg:text-3xl">{title}</h2>
          <a
            href="#"
            className="inline-block rounded-lg border px-4 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-gray-500 hover:text-black focus-visible:ring active:bg-gray-500 md:px-8 md:py-3 md:text-base"
          >
            Xem thêm
          </a>
        </div>
        {/* <div className="grid gap-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-6 xl:grid-cols-4"> */}
        <div className="hide-mobile">
          <SlideFlashSale autoplay={false} loop={false}>
            {chunk(products, products.length / 3).map((d, i) => (
              <div key={i} className="flex flex-row justify-center px-10 gap-8 sm:grid-cols-2">
                {d.map((item, index) => (
                  <EcommerceCard key={item.id} product={item} />
                ))}
              </div>
            ))}
          </SlideFlashSale>
        </div>

        <div className="hide-desktop grid gap-4 gap-y-8 grid-cols-2">
          {products.slice(0, 4).map((item, key) => (
            <EcommerceCard key={key} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
