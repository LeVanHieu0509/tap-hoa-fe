import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { onLogin } from "api/auth";
import CheckBox from "components/checkbox";
import InputFieldSet from "components/input-fileldset";
import useActionApi from "hooks/use-action-api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export function SignIn() {
  const router = useRouter();
  const [hide, setHide] = useState(true);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const action = useActionApi(onLogin);

  const disabled = useMemo(() => {
    return !login.username || !login.password;
  }, [login]);

  const handleLogin = () => {
    action(
      {
        usr_name: login.username?.trim(),
        usr_pass: login.password,
      },
      {
        type: "global",
        name: "",
      }
    )
      .then(({ data }) => {
        if (data.status == "1") {
          localStorage.setItem("currentUser", JSON.stringify(data.data));
          // dispatch(setUser(currentUser));
          router.replace("/manager");
        }
        console.log("data", data);
      })
      .catch((e) => e);
  };

  useEffect(() => {
    if (disabled) {
      return;
    }

    const listener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleLogin();
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, disabled]);

  const onChangeInput = (name: string, value: string) => {
    setLogin((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Login
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <InputFieldSet
              id="username"
              name="username"
              value={login.username}
              placeholder="Tên đăng nhập"
              noTranslateLabel
              onChange={(e) => onChangeInput("username", e.target.value)}
            />
            <InputFieldSet
              id="password"
              name="password"
              type={hide ? "password" : "text"}
              value={login.password}
              placeholder="Mật khẩu"
              noTranslateLabel
              onChange={(e) => onChangeInput("password", e.target.value)}
            />
            <div className="-ml-2.5">
              <CheckBox onChange={() => {}} checked={true} />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleLogin}>
              Đăng nhập
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link href="/auth/sign-up">
                <Typography as="span" variant="small" color="blue" className="ml-1 font-bold">
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
