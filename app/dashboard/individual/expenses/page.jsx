"use client";

import { useState } from "react";
import Layout from "../../../../src/components/dashboard/Layout";
import { BiChevronDown } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { AiFillCar } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { FaCalendarDays } from "react-icons/fa6";
import { CgNametag } from "react-icons/cg";
import Image from "next/image";
import ManualExpense from "../../../../src/components/modals/dashboard/ManualExpense";
import MultipleExpenses from "../../../../src/components/modals/dashboard/MultipleExpenses";
import Expense from "../../../../src/components/dashboard/Expense";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";
import moment from "moment";

const Page = () => {
  const [expenses, setExpenses] = useState();
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showManualExpenseModal, setShowManualExpenseModal] = useState(false);
  const [showMultipleExpenseModal, setShowMultipleExpenseModal] =
    useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [showExpenseSmallModal, setShowExpenseSmallModal] = useState(false);
  const [receipts, setReceipts] = useState(false);

  // Filtering
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  const { isLoading, error } = useQuery({
    queryKey: ["get-orders"],
    queryFn: () => axios.get(`/api/orders`),
    onSuccess: (data) => {
      setExpenses(data.data);
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleChangeFirstname = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchFirstName(value);

    const filteredData = dummyPeople.filter((beneficiary) => {
      const firstname = beneficiary?.firstName.toLowerCase();

      return firstname.includes(value.toLowerCase());
    });

    setFilteredExpenses(filteredData);
  };

  const handleChangeLastname = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchLastName(event.target.value);

    const filteredData = dummyPeople.filter((beneficiary) => {
      const lastname = beneficiary?.lastName.toLowerCase();

      return lastname.includes(value.toLowerCase());
    });

    setFilteredExpenses(filteredData);
  };

  const handleChangeCategory = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchCategory(event.target.value);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const filteredData = dummyPeople.filter((beneficiary) => {
      const birthYear = beneficiary?.dateOfBirth.getFullYear();
      const birthMonth = beneficiary?.dateOfBirth.getMonth();
      const birthDay = beneficiary?.dateOfBirth.getDate();

      const age = currentYear - birthYear;

      if (
        (value == "youth" && currentMonth < birthMonth) ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        return age >= 0 && age <= 18;
      } else if (
        (value == "adult" && currentMonth < birthMonth) ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        return age >= 18 && age <= 64;
      } else if (
        (value == "senior" && currentMonth > birthMonth) ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        return age >= 65;
      }
    });

    setFilteredExpenses(filteredData);
  };

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Expenses</p>
        </div>

        {/* Filter */}
        <div className="px-10 py-4 border-b border-\[\#A9A6DC\]\/80">
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-fit bg-transparent py-2 rounded-md flex flex-row items-center justify-center"
            >
              <LuFilter color="#3683e0" size={18} />
              <p className="text-blue-600 font-normal text-sm ml-2">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </p>
            </button>

            <div className="expense-dropdown flex flex-col items-end relative">
              {showSmallModal && (
                <div className="w-full bg-white rounded-sm absolute top-10 overview-card">
                  <div className="py-4 border-b border-\[\#A9A6DC\]\/80">
                    <p className="text-black font-semibold text-sm pl-4 mb-3">
                      EXPENSE
                    </p>

                    <div
                      onClick={() => setShowManualExpenseModal(true)}
                      className="w-full flex flex-row items-center cursor-pointer px-3 py-2"
                    >
                      <TiDocumentText color="#6361c7" size={30} />
                      <p className="text-black font-normal text-sm ml-2">
                        Manually Create
                      </p>
                    </div>

                    <div
                      onClick={() => setShowMultipleExpenseModal(true)}
                      className="w-full flex flex-row items-center cursor-pointer px-3 py-2"
                    >
                      <TiDocumentText color="#6361c7" size={30} />
                      <p className="text-black font-normal text-sm ml-2">
                        Create Multiple
                      </p>
                    </div>

                    <div
                      onClick={() => alert("Clicked")}
                      className="w-full flex flex-row items-center cursor-pointer px-3 py-2"
                    >
                      <MdOutlineDocumentScanner color="#6361c7" size={30} />
                      <p className="text-black font-normal text-sm ml-2">
                        Scan Receipt
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <p className="text-black font-semibold text-sm pl-4 mb-3">
                      LOCATION
                    </p>

                    <div
                      onClick={() => alert("Clicked")}
                      className="w-full flex flex-row items-center cursor-pointer px-3 py-2"
                    >
                      <AiFillCar color="#6361c7" size={30} />
                      <p className="text-black font-normal text-sm ml-2">
                        Manually Create
                      </p>
                    </div>

                    <div
                      onClick={() => alert("Clicked")}
                      className="w-full flex flex-row items-center cursor-pointer px-3 py-2"
                    >
                      <HiLocationMarker color="#6361c7" size={30} />
                      <p className="text-black font-normal text-sm ml-2">
                        Create from Map
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowSmallModal(!showSmallModal)}
                className="expense-button flex flex-row justify-between items-center text-sm font-normal px-2"
              >
                New Expense
                <BiChevronDown color="#ffffff" size={25} />
              </button>
            </div>
          </div>

          {/* Filter form */}
          {showFilters && (
            <div className="mt-5">
              <form>
                {/* Date of birth filter */}
                <div className="w-2/3 flex flex-row">
                  <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2">
                    <p className="h-full font-normal text-md text-black flex flex-row items-center pr-2 border-r-gray">
                      From
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      value={searchStartDate}
                      onChange={(e) => setSearchStartDate(e.target.value)}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <FaCalendarDays color="#cccccc" size={20} />
                  </div>

                  <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-md text-black flex flex-row items-center pr-2 border-r-gray">
                      To
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      value={searchEndDate}
                      onChange={(e) => setSearchEndDate(e.target.value)}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <FaCalendarDays color="#cccccc" size={20} />
                  </div>
                </div>

                {/* Firstname, Lastname, Age filters */}
                <div className="w-full flex flex-row mt-5">
                  <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2">
                    <p className="h-full font-normal text-md text-black flex flex-row items-center pr-2 border-r-gray">
                      Firstname
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      value={searchFirstName}
                      onChange={handleChangeFirstname}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <CgNametag color="#cccccc" size={35} />
                  </div>

                  <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-md text-black flex flex-row items-center pr-2 border-r-gray">
                      Lastname
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      value={searchLastName}
                      onChange={handleChangeLastname}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <CgNametag color="#cccccc" size={35} />
                  </div>

                  <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-md text-black flex flex-row items-center pr-2 border-r-gray">
                      Category
                    </p>
                    <select
                      className="w-full px-2"
                      id="category-select"
                      onChange={handleChangeCategory}
                    >
                      <option value="none"></option>
                      <option value="youth">Youth</option>
                      <option value="adult">Adult</option>
                      <option value="senior">Senior</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-10 pt-10 pb-20">
          <div className="w-full">
            {expenses?.length > 0 ? (
              <div className="w-full border-gray rounded-md">
                <div className="bg-gray w-full flex flex-row items-center px-3 py-4">
                  <p className="w-1/3 text-dark-gray text-left font-medium text-sm">
                    STAFF
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    TYPE
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    DATE
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    COST
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    STAGE
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    STATUS
                  </p>
                </div>

                {expenses.map((expense) => (
                  <Expense
                    key={expense.id}
                    id={expense.id}
                    staff={`${
                      expense.profile.first_name.charAt(0).toUpperCase() +
                      expense.profile.first_name.slice(1)
                    } ${
                      expense.profile.last_name.charAt(0).toUpperCase() +
                      expense.profile.last_name.slice(1)
                    }`}
                    type={
                      expense.category.charAt(0).toUpperCase() +
                      expense.category.slice(1)
                    }
                    date={moment(
                      new Date(expense?.date),
                      "MMM DD, YYYY, h:mm:ss A"
                    ).format("MMM DD, YYYY")}
                    total={expense.total.toLocaleString()}
                    currency={expense.currency == "gbp" ? "£" : "$"}
                    stage={expense.expense_stage}
                    status={expense.expense_status}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center ">
                {/* No expenses */}
                <div className="w-8/12 flex flex-col items-center px-10 pt-10 pb-20 rounded-md overview-card">
                  <Image
                    src="/images/empty-expenses.svg"
                    alt=""
                    width={120}
                    height={120}
                    className="mb-5"
                  />
                  <p className="text-black font-semibold text-xl mb-5">
                    You have no expense
                  </p>
                  <p className="text-black font-normal text-sm">
                    Drag a receipt onto this page or create a new expense using
                    the button above.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showManualExpenseModal && (
        <ManualExpense onClose={() => setShowManualExpenseModal(false)} />
      )}

      {showMultipleExpenseModal && (
        <MultipleExpenses onClose={() => setShowMultipleExpenseModal(false)} />
      )}
    </>
  );
};

const Orders = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Orders;
