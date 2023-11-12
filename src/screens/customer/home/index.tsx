import { BlogProps, ListProductProps } from "@custom-types";
import { CarouselCustomNavigation } from "components/carousel";
import { useMemo } from "react";
import Blog from "section/home/blog";
import FlashSale from "section/home/flash-sale";
import { Gallery } from "section/home/gallery";
import Products from "section/home/product";
import { HomeWrapper } from "./styled";

interface HomeProps {}

const HomeScreen = ({}: HomeProps) => {
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

  const listProduct: ListProductProps[] = [
    {
      title: "Sơn Lẻ",
      children: [
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
      ],
    },
    {
      title: "Sơn Angels",
      children: [
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
      ],
    },
  ];

  const blogInfo: BlogProps = {
    title: "Hướng dẫn cách làm nail tại nhà đơn giản nàng nào cũng làm được",
    description:
      "Làm nail đang là xu hướng phổ biến hiện nay. Bộ nail giúp các nàng xinh đẹp, nổi bật và cá tính hơn. Rất nhiều bạn nữ khéo tay muốn tự làm nail tại nhà mà không cần phải ra ngoài tiệm.",
    href: "#",
    image: "https://www.evaairways-vn.com/public/uploads/data/images/2021/11/vi-sao-nguoi-viet-qua-my-lam-nail-1.jpg",
  };

  return (
    <HomeWrapper>
      <CarouselCustomNavigation>
        {listImage.map((t, i) => (
          <img key={i} src={t.src} alt={t.alt} className="h-full w-full object-cover" />
        ))}
      </CarouselCustomNavigation>
      <FlashSale />
      <Gallery />
      {listProduct.map((item, key) => (
        <Products key={key} title={item.title} products={item.children} />
      ))}
      <Blog data={blogInfo} />
    </HomeWrapper>
  );
};

export default HomeScreen;
