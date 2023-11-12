import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Interface } from "readline";

interface FooterProps {
  brandName?: string;
  brandLink?: string;
}

export function Footer({
  brandName = "Creative HieuLeVan",
  brandLink = "https://www.facebook.com/lvh.2k1",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2 text-blue-gray-600">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit text-center">
          &copy; {year}, made with <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5" /> by{" "}
          <a href={brandLink} target="_blank" className="transition-colors hover:text-blue-500">
            {brandName}
          </a>{" "}
          for a better web.
        </Typography>
      </div>
    </footer>
  );
}

Footer.defaultProps = {};

export default Footer;
