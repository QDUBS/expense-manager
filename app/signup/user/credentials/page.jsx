"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Background from "../../../../src/components/Background";
import Error from "../../../../src/components/forms/Error";
import Header from "../../../../src/components/nav/Header";
import AppRoutes from "../../../../src/constants/app_routes";
import { saveUserDetails } from "../../../../src/redux/slices/signupSlice";
import { userRegistrationFormSchema } from "../../../../src/schemas/auth";

const Personal = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegistrationFormSchema),
  });

  const onSubmit = (data) => {
    dispatch(saveUserDetails(data));
    console.log("Email -", data.email, "Password -", data.password);
    router.push(AppRoutes.SignUpPersonal);
  };

  return (
    <>
      <Header title="Personal Info" />
      <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
        <div className="bg-white px-5 py-8 md:p-10 rounded-md w-full md:max-w-[500px] lg:max-w-[550px]">
          <div className="flex flex-row items-center justify-center">
            <div className="flex justify-center items-center text-white w-10 h-10 lg:w-14 lg:h-14 bg-bluemedium rounded-full lg:text-xl">
              1
            </div>
            <div className="h-[1px] w-8 bg-bluemedium"></div>
            <div className="flex justify-center items-center text-bluemedium w-10 h-10 border border-bluemedium rounded-full lg:text-xl lg:w-14 lg:h-14">
              2
            </div>
            <div className="h-[1px] w-8 bg-bluemedium"></div>
            <div className="flex justify-center items-center text-bluemedium w-10 h-10 border border-bluemedium rounded-full lg:text-xl lg:w-14 lg:h-14">
              3
            </div>
          </div>

          {/* Form */}
          <div className="mt-5 md:mt-7">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center">
                <h2 className="text-lg md:text-xl lg:text-3xl">
                  Take the first steps
                </h2>
              </div>

              <div className="flex flex-col gap-5 mt-8">
                <div>
                  <p>Email address</p>
                  <input
                    type="email"
                    placeholder="Jane"
                    className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    {...register("email")}
                  />
                  {errors.email && <Error message={errors.email.message} />}
                </div>

                <div>
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="Doe"
                    className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    {...register("password")}
                  />
                  {errors.lastName && (
                    <Error message={errors.lastName.message} />
                  )}
                </div>

                <div className="flex flex-row gap-4 mt-5">
                  <button
                    onClick={() => router.back()}
                    className="secondary-button w-1/3 text-center"
                  >
                    Back
                  </button>
                  <button
                    className="primary-button w-2/3"
                    type="submit"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default Personal;
