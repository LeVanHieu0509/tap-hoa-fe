import CartProduct from "components/cart-product";
import { chunk } from "lodash";
import { useMemo } from "react";
import SlideFlashSale from "./slide";

interface FlashSaleProps {}

const FlashSale = ({}: FlashSaleProps) => {
  const listImage = useMemo(() => {
    return [
      {
        id: 1,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 2,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 3,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 4,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },

      {
        id: 1,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 2,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 3,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 4,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },

      {
        id: 1,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 2,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 3,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
      {
        id: 4,
        rate: 5.0,
        title: "Màu Sơn Móng Tay Mùa Hè Keo 15ml",
        priceOrigin: 75000,
        priceDiscount: 65000,
        discountNo: 21,
      },
    ];
  }, []);

  return (
    <div className="container  mx-auto relative  mt-24 rounded-lg  flex-col flex  bg-black py-6 sm:px-4 sm:py-6 lg:py-12">
      <div className="mb-16 flex flex-row justify-around ">
        <img className="w-2/5" src={`${process.env.basePath}/images/icon-fs.png`} alt="" />
        <div className="flex w-full justify-center gap-12">
          <div className="text-center text-white">
            <h3 className="uppercase">Kết thúc trong</h3>
            <h3>3:60:20</h3>
          </div>
          <div className="text-center  text-white hide-mobile">
            <h3>Đang diễn ra</h3>
            <h3>3:60:20</h3>
          </div>
          <div className="text-center  text-white hide-mobile">
            <h3>Ngày mai</h3>
            <h3>3:60:20</h3>
          </div>
        </div>
      </div>

      <div className=" flex gap-8 hide-desktop justify-center">
        <div className="text-center  text-white ">
          <h2>Đang diễn ra</h2>
          <h5>3:60:20</h5>
        </div>
        <div className="text-center  text-white">
          <h2>Ngày mai</h2>
          <h5>3:60:20</h5>
        </div>
      </div>

      <div className="hide-mobile">
        <SlideFlashSale>
          {chunk(listImage, listImage.length / 3).map((d, i) => (
            <div key={i} className="flex flex-row justify-center px-16 gap-8 sm:grid-cols-2">
              {d.map((item, index) => (
                <CartProduct item={item} key={index} />
              ))}
            </div>
          ))}
        </SlideFlashSale>
      </div>

      <div className="hide-desktop mb-20">
        <SlideFlashSale>
          {chunk(listImage, listImage.length / 3).map((d, i) => (
            <div key={i} className="flex flex-column justify-center mb-24 gap-2 ml-40 mr-40 mt-16">
              {chunk(d, d.length / 2).map((item, index) => (
                <div key={index} className="flex flex-row  justify-center mb-6 gap-2 ml-40 mr-40 mt-16">
                  {item.map((i, k) => (
                    <CartProduct item={i} key={k} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </SlideFlashSale>
      </div>
    </div>
  );
};

export default FlashSale;
