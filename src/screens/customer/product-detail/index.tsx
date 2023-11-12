import { Carousel, Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import { Comment } from "components/comment";
import { Container } from "styles";
import { ProductDetailScreenWrapper, WrapperComment } from "./styled";

interface HomeProps {}

const ProductDetailScreen = ({}: HomeProps) => {
  const listImage = useMemo(() => {
    return [
      {
        src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
        alt: "",
      },
      {
        src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        alt: "",
      },
      {
        src: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        alt: "",
      },
    ];
  }, []);

  const listColor = [
    {
      id: 1,
    },
  ];

  return (
    <ProductDetailScreenWrapper>
      <Container>
        <div className=" py-8 sm:py-8 lg:py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid gap-8 sm:grid-cols-2 relative">
              {/* images - start */}
              <div className="sticky top-60">
                <Carousel className="rounded-xl h-96 mt-60 ">
                  {listImage.map((t, i) => (
                    <img key={i} src={t.src} alt={t.alt} className="h-full w-full object-cover" />
                  ))}
                </Carousel>
              </div>

              {/* images - end */}
              {/* content - start */}
              <div className="">
                {/* name - start */}
                <div className="mb-2 md:mb-3 text-white">
                  <h2 className="text-2xl font-bold  lg:text-3xl">MacBook Air 15 inch M2 2023 8CPU - 10GPU</h2>
                  <h2 className="text-2xl font-bold  lg:text-3xl">37.990.000₫</h2>
                </div>

                {/* name - end */}
                {/* rating - start */}
                <div className="mb-6 flex items-center gap-3 md:mb-10">
                  <div className="flex h-7 items-center gap-1 rounded-full bg-indigo-500 px-2 text-white">
                    <span className="text-sm">4.2</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500 transition duration-100">56 ratings</span>
                </div>
                {/* rating - end */}
                {/* color - start */}
                <div className="mb-4 md:mb-6">
                  <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">Color</span>

                  <div className="flex flex-wrap gap-2">
                    {listColor.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="h-8 w-8 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                      />
                    ))}
                    <span className="h-8 w-8 rounded-full border bg-gray-800 ring-2 ring-gray-800 ring-offset-1 transition duration-100" />
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                    />
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full border bg-gray-200 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                    />
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full border bg-white ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                    />
                  </div>
                </div>
                {/* color - end */}
                {/* size - start */}
                <div className="mb-8 md:mb-10">
                  <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">Size</span>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold  transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                      XS
                    </button>
                    <button
                      type="button"
                      className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold  transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                      S
                    </button>
                    <span className="flex h-8 w-12 cursor-default items-center justify-center rounded-md border border-indigo-500 bg-indigo-500 text-center text-sm font-semibold text-white">
                      M
                    </span>
                    <button
                      type="button"
                      className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold  transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                      L
                    </button>
                    <span className="flex h-8 w-12 cursor-not-allowed items-center justify-center rounded-md border border-transparent bg-white text-center text-sm font-semibold text-gray-400">
                      XL
                    </span>
                  </div>
                </div>
                {/* size - end */}
                {/* price - start */}
                <div className="mb-4">
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-bold  md:text-2xl">$15.00</span>
                    <span className="mb-0.5 text-red-500 line-through">$30.00</span>
                  </div>
                  <span className="text-sm text-gray-500">incl. VAT plus shipping</span>
                </div>
                {/* price - end */}
                {/* shipping notice - start */}
                <div className="mb-6 flex items-center gap-2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                  <span className="text-sm">2-4 day shipping</span>
                </div>
                {/* shipping notice - end */}
                {/* buttons - start */}
                <div className="flex gap-2.5">
                  <button className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base">
                    Thêm vào giỏ hàng
                  </button>
                  <button className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                    Mua ngay
                  </button>
                </div>

                <ul className="mt-24 text-white">
                  <li>
                    Bộ sản phẩm gồm: Thùng máy, Sạc Laptop Apple ( 35W Dual USB-C ), Cáp ( USB-C to MagSafe 3 ), Sách
                    hướng dẫn
                  </li>
                  <li>
                    Hư gì đổi nấy 12 tháng tại 3460 siêu thị trên toàn quốc Xem chi tiết chính sách bảo hành, đổi trả
                  </li>
                  <li>Bảo hành chính hãng 1 năm</li>
                  <li> Giao hàng nhanh toàn quốc Xem chi tiết</li>
                  <li>Tổng đài: 1900.9696.42 (9h00 - 21h00 mỗi ngày)</li>
                </ul>
                {/* buttons - end */}
              </div>
              {/* content - end */}
            </div>
          </div>
        </div>
        <div className=" max-w-3xl mb-40  mx-auto border rounded-lg border-solid p-20">
          <Typography color="white" variant="h5">
            Nội dung về tính năng
          </Typography>
          <p className="text-white">
            MacBook Air 15 inch mỏng không tưởng và sở hữu màn hình Liquid Retina tuyệt đẹp. Siêu mạnh mẽ với chip M2,
            cùng thời lượng pin lên đến 18 giờ,1 máy mang đến hiệu năng phi thường trong một thiết kế siêu gọn nhẹ.
          </p>
          <Typography color="white" variant="h5">
            Pháp lý
          </Typography>
          <p className="text-white">
            Hiện có sẵn các lựa chọn để nâng cấp. 1Thời lượng pin khác nhau tùy theo cách sử dụng và cấu hình. Truy cập
            apple.com/vn/batteries để biết thêm thông tin.
          </p>
        </div>
        {/* <Testimonials /> */}
      </Container>

      <WrapperComment>
        <Comment />
      </WrapperComment>
    </ProductDetailScreenWrapper>
  );
};

export default ProductDetailScreen;
