"use client";

import Image from "next/image";
import { useState } from "react";
import { CgNametag } from "react-icons/cg";
import { LuFilter } from "react-icons/lu";
import Layout from "../../../../src/components/dashboard/Layout";
import Claim from "../../../../src/components/dashboard/Claim";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";

const Page = () => {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);

  // Filtering
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  
  const { isLoading, error } = useQuery({
    queryKey: ["get-expenses"],
    queryFn: () => axios.get(`/api/expenses`),
    onSuccess: (data) => {
      setClaims(data.data);
      console.log(data.data);
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

    setFilteredClaims(filteredData);
  };

  const handleChangeLastname = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchLastName(event.target.value);

    const filteredData = dummyPeople.filter((beneficiary) => {
      const lastname = beneficiary?.lastName.toLowerCase();

      return lastname.includes(value.toLowerCase());
    });

    setFilteredClaims(filteredData);
  };

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Claims</p>
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
          </div>

          {/* Filter form */}
          {showFilters && (
            <div className="mt-5">
              <form>
                {/* Firstname, Lastname, Age filters */}
                <div className="w-full flex flex-row mt-10">
                  <div className="w-full h-11 flex flex-row items-center border-gray rounded-md px-2">
                    <p className="h-full font-normal text-md text-black flex flex-row items-center pr-2 border-r-gray">
                      Name
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
                      Merchant
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
                      onChange={handleChangeFirstname}
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
          <div className="w-full flex flex-col items-center">
            {claims?.length > 0 ? (
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

                {claims.map((claim) => (
                  <Claim
                    key={claim.id}
                    id={claim.id}
                    staff={`${
                      claim.profile.first_name.charAt(0).toUpperCase() +
                      claim.profile.first_name.slice(1)
                    } ${
                      claim.profile.last_name.charAt(0).toUpperCase() +
                      claim.profile.last_name.slice(1)
                    }`}
                    type={
                      claim.category.charAt(0).toUpperCase() +
                      claim.category.slice(1)
                    }
                    date={moment(
                      new Date(claim?.date),
                      "MMM DD, YYYY, h:mm:ss A"
                    ).format("MMM DD, YYYY")}
                    total={claim.total.toLocaleString()}
                    currency={claim.currency == "gbp" ? "£" : "$"}
                    stage={claim.expense_stage}
                    status={claim.expense_status}
                  />
                ))}
              </div>
            ) : (
              <>
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
                    Oops! Nothing here
                  </p>
                  <p className="text-black font-normal text-sm">
                    You have no claims to review.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const Expenses = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Expenses;
