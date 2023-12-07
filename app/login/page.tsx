"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Error from "../../src/components/forms/Error";
import AppRoutes from "../../src/constants/app_routes";
import { ILoginFormInputs } from "../../src/interfaces/auth";
import { loginFormSchema } from "../../src/schemas/auth";

const Login = () => {
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs | any>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: ILoginFormInputs) => {
    const { email, password } = data;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response?.ok) {
      console.log("Logged in...");
      return router.push(AppRoutes.Expenses);
    }
    if (response?.status === 403) {
      setLoginError(true);
      setLoginErrorMessage("Please verify your account");
    } else {
      setLoginError(true);
      setLoginErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      <div className="flex flex-row- max-w-[2000px] gap-x-10 h-full lg:gap-x-12 mx-auto px-0 lg:pr-20">
        <section className="hidden md:block h-[820px] md:w-3/5 rounded-md">
          <Image
            src={"/images/login-image.jpg"}
            alt=""
            width={900}
            height={700}
            className="h-screen"
          />
        </section>

        {/* Form */}
        <section className="w-full md:w-2/5">
          <h1 className="pt-12 font-bold text-2xl lg:text-3xl md:mt-20">
            Welcome back
          </h1>

          {/* Form components*/}
          <div className="mt-20">
            <form onSubmit={handleSubmit(onSubmit)}>
              {loginError && (
                <div className="flex flex-col text-center text-red-600 mb-2 pt-2 pb-2">
                  {loginErrorMessage}
                </div>
              )}
              <div className="flex flex-col">
                <h3>Email address</h3>
                <input
                  type="email"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2 placeholder:font-normal"
                  placeholder="Janedoe@gmail.com"
                  {...register("email")}
                />
                {errors.email && <Error message={errors.email.message} />}
              </div>

              <div className="flex flex-col mt-5">
                <h3>Password</h3>
                <input
                  type="password"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2 placeholder:font-normal"
                  placeholder="Min. 8 characters"
                  {...register("password")}
                />
                {errors.password && <Error message={errors.password.message} />}
              </div>

              <div className="flex flex-col mt-14 items-center space-y-4">
                <button className="primary-button w-full" type="submit">
                  Login to account
                </button>
                <p>
                  Don&apos;t have an account yet?
                  <span className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong ml-2">
                    <Link href={AppRoutes.SignUp}>Sign up</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
