"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Background from "../../../../src/components/Background";
import Error from "../../../../src/components/forms/Error";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";
import Header from "../../../../src/components/nav/Header";
import { saveprofessionalDetails } from "../../../../src/redux/slices/signupSlice";
import {
  personalDetailsFormSchema,
  professionalDetailsFormSchema,
  userRegistrationFormSchema,
} from "../../../../src/schemas/auth";
import AppRoutes from "../../../../src/constants/app_routes";

const Professional = () => {
  const router = useRouter();
  const [signUpError, setSignUpError] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const { userDetails, personalDetails } = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const {mutate, isLoading} = useMutation({
    mutationFn: (registrationDetails) =>
      axios.post(`/api/users`, registrationDetails),
    onSuccess: (data) => {
      router.push(AppRoutes.SignUpComplete);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(professionalDetailsFormSchema),
  });

  const onSubmit = async (data) => {
    dispatch(saveprofessionalDetails(data));

    const userDetailsValid = await userRegistrationFormSchema.isValid(
      userDetails
    );
    const personalDetailsValid = await personalDetailsFormSchema.isValid(
      personalDetails
    );

    if (!userDetailsValid) {
      setSignUpError(true);
      setSignUpErrorMessage("Please provide a valid email and password");
      return;
    }

    if (!personalDetailsValid) {
      setSignUpError(true);
      setSignUpErrorMessage("Please provide valid personal information");
      return;
    }

    const registrationDetails = { ...data, ...userDetails, ...personalDetails };
    console.log(registrationDetails);
    mutate(registrationDetails);
  };

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Header title="Professional Info" />
      <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
        <div className="bg-white px-5 py-8 md:p-10 rounded-md w-full md:max-w-[500px] lg:max-w-[550px]">
          <div className="flex flex-row items-center justify-center">
            <div className="flex justify-center items-center text-white w-10 h-10 lg:w-14 lg:h-14 bg-bluemedium rounded-full lg:text-xl">
              <Image
                unoptimized={true}
                width={20}
                height={20}
                src="/images/Tick.svg"
                alt=""
              />
            </div>
            <div className="h-[1px] w-8 bg-bluemedium"></div>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-bluemedium rounded-full lg:text-xl lg:w-14 lg:h-14">
              <Image
                unoptimized={true}
                width={20}
                height={20}
                src="/images/Tick.svg"
                alt=""
              />
            </div>
            <div className="h-[1px] w-8 bg-bluemedium"></div>
            <div className="flex justify-center items-center text-white w-10 h-10 bg-bluemedium rounded-full lg:text-xl lg:w-14 lg:h-14">
              3
            </div>
          </div>

          {/* Form */}
          <div className="mt-5 md:mt-7">
            <div className="flex justify-center">
              <h2 className="text-lg md:text-xl lg:text-3xl">
                You're almost there
              </h2>
            </div>
            {signUpError && (
              <div className="flex justify-center">
                <div className="text-lg md:text-xl lg:text-base text-red-600  mt-2">
                  {signUpErrorMessage}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-5 mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <p>Department</p>
                  <select
                    {...register("department")}
                    className="flex flex-row justify-between bg-[#F3F3F3] px-4 py-4 rounded-md w-full mt-3"
                  >
                    <option>Select department</option>
                    <option value="software_informatics">
                      Software & Informatics
                    </option>
                    <option value="facilities_procurement">
                      Facilities & Procurement
                    </option>
                    <option value="human_resources">Human Resources</option>
                    <option value="finance">Finance</option>
                  </select>
                  {errors.department && (
                    <Error message={errors.department.message?.toString()} />
                  )}
                </div>

                <div className="mt-5">
                  <p>Role</p>
                  <input
                    type="text"
                    placeholder="Software Engineer"
                    className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    {...register("role")}
                  />
                  {errors.role && (
                    <Error message={errors.role.message?.toString()} />
                  )}
                </div>

                <div className="mt-5">
                  <p>Staff ID</p>
                  <input
                    type="text"
                    placeholder="#09829"
                    className="mt-2 px-4 py-4 bg-[#F3F3F3] rounded-md w-full"
                    {...register("staffID")}
                  />
                  {errors.staffID && (
                    <Error message={errors.staffID.message?.toString()} />
                  )}
                </div>

                <div className="mt-5">
                  <p>Type</p>
                  <select
                    {...register("type")}
                    className="flex flex-row justify-between bg-[#F3F3F3] px-4 py-4 rounded-md w-full mt-3"
                  >
                    <option>Select user type</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin & Procurement</option>
                    <option value="branch_unit_head">Branch Unit Head</option>
                    <option value="compliance_internal_control">
                      Compliance Internal Control
                    </option>
                    <option value="department_head">Department Head</option>
                    <option value="head_of_compliance">
                      Head of Compliance
                    </option>
                    <option value="finance">Finance</option>
                    <option value="head_of_finance">Head of Finance</option>
                    <option value="business_head">Business Head</option>
                    <option value="country_head">Country Head</option>
                  </select>
                  {errors.department && (
                    <Error message={errors.department.message?.toString()} />
                  )}
                </div>

                <div className="flex flex-row gap-4 mt-5">
                  <button
                    onClick={() => router.push(AppRoutes.Personal)}
                    className="secondary-button w-1/3"
                  >
                    Back
                  </button>
                  <button className="primary-button w-2/3" type="submit">
                    Proceed
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default Professional;
