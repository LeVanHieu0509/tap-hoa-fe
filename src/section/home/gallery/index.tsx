import Link from "next/link";

export function Gallery() {
  const list = [
    {
      href: "",
      title: "Sơn lẻ",
      image:
        "https://img.freepik.com/premium-photo/blue-manicure-with-earrings-white-wooden-background-nail-art-design_106029-2842.jpg?w=740",
    },
    {
      href: "",
      title: "Dụng cụ",
      image:
        "https://img.freepik.com/free-photo/close-up-manicurist-using-nail-polish_23-2149171334.jpg?w=740&t=st=1696439088~exp=1696439688~hmac=1e694cd810cd3e85d9988a94d0e4dcbc622a3e9f266622eecc7343be069fa142",
    },
    {
      href: "",
      title: "Sơn Chinchy",
      image:
        "https://img.freepik.com/free-photo/woman-hands-nails-manicure-fashion-blue-jewelry_186202-5907.jpg?w=740&t=st=1696439148~exp=1696439748~hmac=ba91f16daa6aff4386f013f742df923f1ebd99ddfefddb4b87840229757ee1e8",
    },
    {
      href: "",
      title: "Sơn Angels",
      image:
        "https://img.freepik.com/premium-photo/shattered-glass-purple-manicure-black-background_106029-3146.jpg?w=740",
    },
    {
      href: "",
      title: "Sơn Mẫu",
      image:
        "https://img.freepik.com/free-photo/macro-shot-woman-s-lips-nails-painted-bright-color-black_186202-6878.jpg?w=740&t=st=1696439274~exp=1696439874~hmac=15870e2d6d5a07c4e7d6a80c06118c780ad3ea429a97629f611a905d96c3cdff",
    },
    {
      href: "",
      title: "Sơn Kody",
      image:
        "https://img.freepik.com/free-photo/beautiful-women-hands-with-black-manicure-after-spa-procedures-spa-treatment-concept_186202-7779.jpg?w=740&t=st=1696439171~exp=1696439771~hmac=d559e46860df7b48ce8fc760fe5b6d5436cbaa59338db204413f0c28a101f0b8",
    },
  ];

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mb-8 md:grid-cols-3  lg:grid-cols-6 md:gap-6 xl:gap-8">
          {list.map((item, key) => (
            <Link
              key={key}
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                src={item.image}
                loading="lazy"
                alt="Photo by Minh Pham"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
              <span className="absolute bottom-0 ml-4 mb-3 inline-block text-xl bold text-white md:ml-5">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
