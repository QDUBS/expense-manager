"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../../../../../src/components/dashboard/Layout";
import LoadingSpinner from "../../../../../src/components/loading/LoadingSpinner";

const Page = () => {
  const params = useParams();
  const { id } = params;

  const { isLoading, data: expense } = useQuery({
    queryKey: ["get-expense"],
    queryFn: () => axios.get(`/api/expense?id=${id}`),
    enabled: !!id,
    onSuccess: (data) => {
      console.log(data.data);
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

  useEffect(() => {
    console.log(expense);
  }, [expense]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="bg-blue-400 px-10 pt-20 flex flex-col items-center relative">
          <div className="bg-blue-400 px-10 flex flex-col items-center relative"></div>
          <div className="bg-white w-full px-4 py-8 rounded-md overview-card move">
            <p className="text-lg font-medium mb-2">EXPENSE DESCRIPTION</p>
            <div>
              <p className="text-md font-normal mb-2">
                {moment(
                  new Date(expense.data.date),
                  "MMM DD, YYYY, h:mm:ss A"
                ).format("MMM DD, YYYY")}
              </p>
              <p className="text-md font-normal mb-2 text-gray-600">
                {expense.data.currency == "gbp" ? "£" : "$"}
                {expense.data.total.toLocaleString()}
              </p>
              <p className="text-md font-normal mb-2 text-black">
                {expense.data.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-10 pt-20 pb-20">
          <table className="custom-table mb-10">
            <tbody>
              <tr>
                {/* Employee Name */}
                <td className="bg-gray w-2/12">
                  <p className="text-sm font-semibold">EMPLOYEE NAME</p>
                </td>
                <td className="w-4/12">
                  <p className="text-sm font-normal">{`${
                    expense.data.profile.first_name.charAt(0).toUpperCase() +
                    expense.data.profile.first_name.slice(1)
                  } ${
                    expense.data.profile.last_name.charAt(0).toUpperCase() +
                    expense.data.profile.last_name.slice(1)
                  }`}</p>
                </td>

                {/* Department */}
                <td className="bg-gray w-2/12">
                  <p className="text-sm font-semibold">DEPARTMENT</p>
                </td>
                <td className="w-4/12">
                  <p className="text-sm font-normal">
                    {getDepartment(expense.data.profile.department)}
                  </p>
                </td>
              </tr>

              <tr>
                {/* Employee ID */}
                <td className="bg-gray w-2/12">
                  <p className="text-sm font-semibold">EMPLOYEE ID</p>
                </td>
                <td className="w-4/12">
                  <p className="text-sm font-normal">
                    #{expense.data.profile.staff_id}
                  </p>
                </td>

                {/* Department */}
                <td className="bg-gray w-2/12">
                  <p className="text-sm font-semibold">REVIEWER</p>
                </td>
                <td className="w-4/12">
                  <p className="text-sm font-normal"></p>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Merchant</th>
                <th>Category</th>
                <th>Currency</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="text-sm font-normal">
                    {moment(
                      new Date(expense.data.date),
                      "MMM DD, YYYY, h:mm:ss A"
                    ).format("MMM DD, YYYY")}
                  </p>
                </td>
                <td>
                  <p className="text-sm font-normal">{expense.data.merchant}</p>
                </td>
                <td>
                  <p className="text-sm font-normal">
                    {expense.data.category.charAt(0).toUpperCase() +
                      expense.data.category.slice(1)}
                  </p>
                </td>
                <td>
                  <p className="text-sm font-normal">
                    {expense.data.currency == "gbp"
                      ? "British Pounds (£)"
                      : "US Dollar ($)"}
                  </p>
                </td>
                <td className="bg-gray">
                  <p className="text-sm font-semibold">
                    {expense.data.currency == "gbp" ? "£" : "$"}
                    {expense.data.total.toLocaleString()}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Documents */}
        {/* <div>
          <p>Document</p>
          <div>

          </div>
        </div> */}
      </section>
    </>
  );
};

const Expense = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Expense;
