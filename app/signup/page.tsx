"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Error from "../../src/components/forms/Error";
import Header from "../../src/components/nav/Header";
import AppRoutes from "../../src/constants/app_routes";
import { ISignupFormInputs } from "../../src/interfaces/auth";
import { userRegistrationFormSchema } from "../../src/schemas/auth";
import LoadingSpinner from "../../src/components/loading/LoadingSpinner";

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(userRegistrationFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (registrationDetails: ISignupFormInputs) =>
      axios.post(`/api/user`, registrationDetails),
    onSuccess: async (data: any) => {
      router.push(AppRoutes.SignUpComplete);
    },
  });

  const onSubmit = async (data: ISignupFormInputs) => {
    mutate(data);
    console.log("Email -", data.email, "Password -", data.password);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header title="Sign Up" />
      <div className="flex flex-row- max-w-[2000px] gap-x-10 h-full lg:gap-x-12 mx-auto px-0 lg:pr-20">
        <section className="hidden md:block h-[820px] md:w-3/5 rounded-md">
          <Image
            src={"/images/login-image.jpg"}
            alt=""
            width={900}
            height={700}
          />
        </section>

        {/*Form */}
        <section className="w-full pt-12 md:w-2/5">
          <h1 className="pt-20 font-bold text-2xl lg:text-3xl">
            Create an account
          </h1>

          {/*Form components */}
          <div className="mt-12 pt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* {signupError && (
                <div className="flex flex-col text-center text-red-600 mb-2 pt-2 pb-2">
                  {signupErrorMessage}
                </div>
              )} */}
              <div className="flex flex-col mt-5">
                <h3>Email address</h3>
                <input
                  type="email"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                  placeholder="Janedoe@gmail.com"
                  {...register("email")}
                />
                {errors.email && <Error message={errors.email.message} />}
              </div>

              <div className="flex flex-col mt-5">
                <h3>Password</h3>
                <input
                  type="password"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                  placeholder="Min. 8 characters"
                  {...register("password")}
                />
                {errors.password && <Error message={errors.password.message} />}
              </div>

              <div className="flex flex-col mt-14 items-center space-y-4">
                <button type="submit" className="primary-button w-full">
                  Create account
                </button>
                <p>
                  Already have an account? &nbsp;
                  <span className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong">
                    <Link href={`${AppRoutes.Login}`}>
                      <p>Sign in</p>
                    </Link>
                  </span>
                </p>
              </div>

              <p className="small text-center mt-10">
                By creating an account, you accept our &nbsp;
                <Link href={`${AppRoutes.Login}`}>
                  <span className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong ml-1 mr-1 cursor-pointer">
                    terms and conditions
                  </span>
                </Link>
                &nbsp; and our &nbsp;
                <Link href={`${AppRoutes.Login}`}>
                  <span className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong ml-1 cursor-pointer">
                    privacy policy
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;
