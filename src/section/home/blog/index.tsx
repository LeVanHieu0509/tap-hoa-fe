import React from "react";
import { BlogProps } from "../../../@custom-types";

interface Props {
  data: BlogProps;
}

const Blog = ({ data }: Props) => {
  return (
    <div className=" py-6 sm:py-8 lg:py-12 ">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col overflow-hidden rounded-lg sm:flex-row md:h-80" style={{ background: "#323232" }}>
          {/* image - start */}
          <div className="order-first h-48 w-full bg-gray-300 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
            <img
              src={data.image}
              loading="lazy"
              alt="Photo by Andras Vas"
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* image - end */}
          {/* content - start */}
          <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
            <h2 className="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">{data.title}</h2>
            <p className="mb-8 max-w-md  text-white">{data.description}</p>
            <div className="mt-auto">
              <a
                href={data.href}
                className="inline-block rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
              >
                Xem thêm
              </a>
            </div>
          </div>
          {/* content - end */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
