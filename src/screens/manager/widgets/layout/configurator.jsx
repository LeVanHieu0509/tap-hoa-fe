import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { logout } from "api/auth";
import { getCategories } from "api/manager";
import useActionApi from "hooks/use-action-api";
import { useAppSelector } from "hooks/use-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { rootAction } from "redux/reducers/root-reducer";
import { removeLocalItem } from "redux/store";
import {
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  useMaterialTailwindController,
} from "screens/manager/context";
import { FlexColumn } from "styles/common";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function Configurator() {
  const router = useRouter();
  const dispatchRedux = useDispatch();

  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } = controller;

  const { currentUser } = useAppSelector((state) => state.rootReducer);

  const actionLogout = useActionApi(logout);

  const sidenavColors = {
    blue: "from-blue-400 to-blue-600",
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  const handleLogout = () => {
    actionLogout(
      { refreshToken: currentUser.tokens.refreshToken },
      {
        type: "global",
        name: "",
      }
    )
      .then(({ data }) => {
        if (data.status == "1") {
          removeLocalItem("currentUser");
          removeLocalItem("orderCarts");
          removeLocalItem("cacheData");

          router.push("/auth/sign-in");
        }
      })
      .catch((e) => e);
  };
  return (
    <aside
      className={` fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <FlexColumn justify="space-between">
        <div>
          {" "}
          <div className="flex items-start justify-between px-6 pt-8 pb-6">
            <div>
              <Typography variant="h5" color="blue-gray">
                Cài đặt
              </Typography>
              <Typography className="font-normal text-blue-gray-600">Hãy xem thông tin dưới đây</Typography>
            </div>
            <IconButton variant="text" color="blue-gray" onClick={() => setOpenConfigurator(dispatch, false)}>
              <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="py-4 px-6">
            <div className="mb-12">
              <Typography variant="h6" color="blue-gray">
                Chọn màu Button
              </Typography>
              <div className="mt-3 flex items-center gap-2">
                {Object.keys(sidenavColors).map((color) => (
                  <span
                    key={color}
                    className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                      sidenavColors[color]
                    } ${sidenavColor === color ? "border-black" : "border-transparent"}`}
                    onClick={() => setSidenavColor(dispatch, color)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-12">
              <Typography variant="h6" color="blue-gray">
                Chế độ Sáng/Tối
              </Typography>
              <Typography variant="small" color="gray">
                Có 3 loại chế độ cho bạn chọn
              </Typography>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant={sidenavType === "dark" ? "gradient" : "outlined"}
                  onClick={() => setSidenavType(dispatch, "dark")}
                >
                  Tối
                </Button>
                <Button
                  variant={sidenavType === "transparent" ? "gradient" : "outlined"}
                  onClick={() => setSidenavType(dispatch, "transparent")}
                >
                  Trong suốt
                </Button>
                <Button
                  variant={sidenavType === "white" ? "gradient" : "outlined"}
                  onClick={() => setSidenavType(dispatch, "white")}
                >
                  Trắng
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 w-full">
          <hr />
          <div className="my-8 flex flex-col gap-4">
            <Button variant="filled" color="blue-gray" fullWidth onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </FlexColumn>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
