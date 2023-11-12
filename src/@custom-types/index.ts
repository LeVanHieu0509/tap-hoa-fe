export interface ListProductProps {
  title: string;
  children: ProductProps[];
}

export interface ProductProps {
  id: number;
  image: string;
  title: string;
  priceOrigin: number;
  discountPrice: number;
  percent: number;
  description: string;
}

export interface BlogProps {
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface ResponseStatus {
  status: string;
  errMsg: string;
}
