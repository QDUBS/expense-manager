"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../../../../../src/components/dashboard/Layout";
import LoadingSpinner from "../../../../../src/components/loading/LoadingSpinner";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseUpdateFormSchema } from "../../../../../src/schemas/expense";
import { toast } from "react-toastify";
import { IExpenseUpdateFormInputs } from "../../../../../src/interfaces/expense";

const Page = () => {
  const [receipts, setReceipts] = useState(false);
  const params = useParams();
  const { id } = params;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(expenseUpdateFormSchema),
  });

  const { isLoading, data: expense } = useQuery({
    queryKey: ["get-expense"],
    queryFn: () => axios.get(`/api/expense?id=${id}`),
    enabled: !!id,
    onSuccess: (data) => {
      console.log("");
      setValue("merchant", data.data.merchant);
      setValue("total", data.data.total);
      setValue("currency", data.data.currency);
      setValue("category", data.data.category);
      setValue("description", data.data.description);
      setValue("receipt", data.data.receipt);
    },
  });

  const { isLoading: acceptLoading, mutate } = useMutation({
    mutationFn: (expenseData: IExpenseUpdateFormInputs | any) =>
      axios.put(`/api/expense`, expenseData),
    onSuccess: async (data: any) => {
      toast("Claim updated successfully");
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

  const rejectClaim = () => {
    setValue("expense_stage", "REJECTED");
    // setShowSave(true);
  };

  const approveClaim = () => {
    setValue("expense_stage", "APPROVED");
    // setShowSave(true);
  };

  const submit = async (data: IExpenseUpdateFormInputs | any) => {
    const {
      merchant,
      total,
      currency,
      category,
      description,
      receipt,
      expense_stage,
    } = data;
    const formData = new FormData();

    let updatedData: any = {
      id,
      merchant,
      total,
      currency,
      category,
      description,
      receipt,
      expense_stage,
    };
    formData.append("data", JSON.stringify(updatedData));
    mutate(formData as any);
  };

  if (isLoading || acceptLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="bg-blue-400 px-10 pt-20 flex flex-col items-center relative">
          <div className="bg-blue-400 px-10 flex flex-col items-center relative"></div>

          <form onSubmit={handleSubmit(submit)} className="w-full">
            <div className="bg-white w-full px-4 py-8 rounded-md overview-card move">
              <div className="w-full flex flex-row justify-between">
                <div>
                  <p className="text-lg font-medium mb-2">
                    EXPENSE DESCRIPTION
                  </p>
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
                    <p className="w-full text-md font-normal mb-2 text-black">
                      {expense.data.description}
                    </p>
                  </div>
                </div>

                <div>
                  <button className="reject-button" onClick={rejectClaim}>
                    Reject
                  </button>
                  <button
                    className="approve-button ml-2"
                    onClick={approveClaim}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </form>
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

const Claim = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Claim;
