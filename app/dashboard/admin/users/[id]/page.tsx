"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import emptyProfileImage from "public/images/empty-profile-image.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Layout from "../../../../../src/components/dashboard/Layout";
import LoadingSpinner from "../../../../../src/components/loading/LoadingSpinner";
import User from "../../../../../src/components/modals/dashboard/User";
import { expenseUpdateFormSchema } from "../../../../../src/schemas/expense";
import { setProfileDetails } from "../../../../../src/redux/slices/profileSlice";

const Page = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(expenseUpdateFormSchema),
  });

  const { isLoading, data: user } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => axios.get(`/api/user?id=${id}`),
    enabled: !!id,
    onSuccess: (data) => {
      dispatch(
        setProfileDetails({
          photo: data.data?.profile_data?.photo,
          firstName: data.data?.profile_data?.first_name,
          lastName: data.data?.profile_data?.last_name,
          mobileNumber: data.data?.profile_data?.mobile_number,
          department: data.data?.profile_data?.department,
          role: data.data?.profile_data?.role,
          staffID: data.data?.profile_data?.staff_id,
        })
      );
    },
  });

  const getDepartment = (department: string) => {
    if (department == "software_informatics") {
      return "Software & Informatics";
    } else if (department == "facilities_procurement") {
      return "Facilities & Procurement";
    } else if (department == "human_resources") {
      return "Human Resources";
    } else if (department == "finance") {
      return "Finance";
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="bg-blue-400 px-10 py-20 flex flex-col items-center relative"></div>
        <div className="w-full flex flex-row px-10 py-8 move-up">
          <div className="w-half py-20 bg-white flex flex-col justify-center items-center rounded-2xl overview-card">
            {user.data.profile_data?.first_name ? (
              <Image
                unoptimized={true}
                width={120}
                height={120}
                src={user.data.profile_data?.photo}
                alt="Profile Picture"
                className="w-48 h-48 rounded-full object-cover"
              />
            ) : (
              <Image
                unoptimized={true}
                width={120}
                height={120}
                src={emptyProfileImage}
                alt="Profile Picture"
                className="w-48 h-48 rounded-full object-cover"
              />
            )}

            <div className="w-full px-20 mt-8">
              <div className="w-full flex flex-row items-center justify-between mt-5">
                <div className="py-4 border-b-gray">
                  <p className="text-md font-normal">
                    {user.data.profile_data?.first_name
                      .charAt(0)
                      .toUpperCase() +
                      user.data.profile_data?.first_name.slice(1)}{" "}
                    {user.data.profile_data?.last_name.charAt(0).toUpperCase() +
                      user.data.profile_data?.last_name.slice(1)}
                  </p>
                </div>

                <div className="py-4 border-b-gray">
                  <p className="text-md font-normal">
                    {user.data.profile_data?.mobile_number}
                  </p>
                </div>
              </div>

              <div className="py-4 border-b-gray mt-5">
                <p className="text-md font-normal">{user.data.email}</p>
              </div>
            </div>

            <button
              className="w-3/12 font-medium edit-profile-button rounded-full mt-10"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
          </div>

          <div className="w-half">
            <div className="bg-white rounded-2xl ml-10 pb-20 overview-card">
              <div className="flex flex-row items-center justify-between px-6 py-3 border-b border-\[\#A9A6DC\]\/80 ">
                <p className="pt-0 font-normal text-xl">Staff Information</p>
              </div>

              <div className="w-full px-6 pb-3 mt-8">
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="w-6/12 py-4 border-b-gray">
                    <p className="text-md font-normal">
                      {getDepartment(user.data.profile_data?.department)}
                    </p>
                  </div>

                  <div className="w-6/12 py-4 border-b-gray ml-4">
                    <p className="text-md font-normal">
                      {user.data.profile_data?.role}
                    </p>
                  </div>
                </div>

                <div className="py-4 border-b-gray mt-5">
                  <p className="text-md font-normal">
                    #{user.data.profile_data?.staff_id}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl ml-10 mt-10 pb-20 overview-card">
              <div className="flex flex-row items-center justify-between px-6 py-3 border-b border-\[\#A9A6DC\]\/80 ">
                <p className="pt-0 font-normal text-xl">Stats</p>
              </div>

              <div className="w-full px-6 pb-3 mt-8">
                <div className="flex flex-row items-center justify-between py-4 border-b-gray mt-5">
                  <p className="text-md font-medium">
                    Claims Raised This Month
                  </p>

                  <p className="text-md font-normal">3 ($200)</p>
                </div>

                <div className="flex flex-row items-center justify-between py-4 border-b-gray mt-5">
                  <p className="text-md font-medium">Claims Raised This Year</p>

                  <p className="text-md font-normal">25 ($2000)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && <User onClose={() => setShowModal(false)} />}
    </>
  );
};

const UserDetail = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default UserDetail;
