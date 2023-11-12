import { Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import { Container } from "styles";
import { Flex } from "styles/common";
import { CarouselCustomNavigation } from "../../../components/carousel";
import Dropdown from "../../../components/dropdown";
import { TransparentTabs } from "../../../components/tab";
import { ProductScreenWrapper } from "./styled";
import { EcommerceCard } from "components/card";

interface HomeProps {}

const ProductScreen = ({}: HomeProps) => {
  const listImage = useMemo(() => {
    return [
      {
        src: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/09/banner/IP15-2880-800-1920x533-1.png",
        alt: "",
      },
      {
        src: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/09/banner/AWS9coming-2880-800-1920x533.png",
        alt: "",
      },
      {
        src: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/09/banner/F19A96FD-C575-4558-A3FA-69CCB5178BAE-1920x533.png",
        alt: "",
      },
    ];
  }, []);

  const data = [
    {
      id: 1,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 2,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 3,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 4,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 5,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 6,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 7,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 8,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 9,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 10,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 11,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
    {
      id: 12,
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-zs7eh3xdgvovf8",
      title: "[ANGELS] Sơn gel móng tay ",
      priceOrigin: 2000000,
      discountPrice: 150000,
      percent: 16,
      description: "Giảm giá sâu",
    },
  ];
  return (
    <ProductScreenWrapper>
      <Container>
        <Typography variant="h4" className="text-center pb-20 mt-24">
          Iphone
        </Typography>

        <CarouselCustomNavigation className="rounded-xl" height={300}>
          {listImage.map((t, i) => (
            <img key={i} src={t.src} alt={t.alt} className=" h-full w-full object-cover" />
          ))}
        </CarouselCustomNavigation>
        <Flex justify="flex-end" className="m-4 w-full">
          <Dropdown />
        </Flex>

        <TransparentTabs />
        <div className="grid gap-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {/* product - start */}

          {data.map((item, index) => (
            <EcommerceCard key={item.id} product={item} />
          ))}
        </div>
      </Container>
    </ProductScreenWrapper>
  );
};

export default ProductScreen;
