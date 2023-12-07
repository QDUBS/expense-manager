"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgNametag } from "react-icons/cg";
import { LuFilter } from "react-icons/lu";
import Layout from "../../../../src/components/dashboard/Layout";
import User from "../../../../src/components/dashboard/User";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";
import AppRoutes from "../../../../src/constants/app_routes";

const Page = () => {
  const { data } = useSession();
  const [single_user, setSingleUser] = useState();
  const [users, setUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);

  // Filtering
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  const { isLoading, error } = useQuery({
    queryKey: ["get-users"],
    queryFn: () => axios.get(`/api/users`),
    onSuccess: (data) => {
      setUsers(data.data);
      console.log(data.data);
    },
  });

  const getDepartment = (department) => {
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

  const getType = (type) => {
    if (type == "staff") {
      return "Staff";
    } else if (type == "admin") {
      return "Admin & Procurement";
    } else if (type == "branch_unit_head") {
      return "Branch Unit Head";
    } else if (type == "compliance_internal_control") {
      return "Compliance Internal Control";
    } else if (type == "department_head") {
      return "Department Head";
    } else if (type == "head_of_compliance") {
      return "Head of Compliance";
    } else if (type == "finance") {
      return "Finance";
    } else if (type == "head_of_finance") {
      return "Head of Finance";
    } else if (type == "business_head") {
      return "Business Head";
    } else if (type == "country_head") {
      return "Country Head";
    }
  };

  const handleChangeFirstname = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchFirstName(value);

    const filteredData = dummyPeople.filter((beneficiary) => {
      const firstname = beneficiary?.firstName.toLowerCase();

      return firstname.includes(value.toLowerCase());
    });

    setFilteredUsers(filteredData);
  };

  const handleChangeLastname = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchLastName(event.target.value);

    const filteredData = dummyPeople.filter((beneficiary) => {
      const lastname = beneficiary?.lastName.toLowerCase();

      return lastname.includes(value.toLowerCase());
    });

    setFilteredUsers(filteredData);
  };

  useEffect(() => {
    setSingleUser(data?.user?.user?.user);
  }, [data?.user, single_user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Users</p>
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
              <Link href={AppRoutes.SignUpCredentials}>
                <button className="user-button text-sm text-center font-normal px-6 py-2">
                  New User
                </button>
              </Link>
            </div>
          </div>

          {/* Filter form */}
          {showFilters && (
            <div className="mt-5">
              <form>
                {/* Firstname, Lastname, Age filters */}
                <div className="w-full flex flex-row mt-10">
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
            {users?.length > 0 ? (
              <div className="w-full border-gray rounded-md">
                <div className="bg-gray w-full flex flex-row items-center px-3 py-4">
                  <p className="w-1/3 text-dark-gray text-left font-medium text-sm">
                    NAME
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    DEPARTMENT
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    ROLE
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    STAFF ID
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    STAFF CATEGORY
                  </p>
                </div>

                {users.map((user) => (
                  <User
                    key={user.id}
                    id={user.id}
                    name={`${
                      user.profile_data.first_name.charAt(0).toUpperCase() +
                      user.profile_data.first_name.slice(1)
                    } ${
                      user.profile_data.last_name.charAt(0).toUpperCase() +
                      user.profile_data.last_name.slice(1)
                    }`}
                    department={getDepartment(user.profile_data.department)}
                    role={`${
                      user.profile_data.role.charAt(0).toUpperCase() +
                      user.profile_data.role.slice(1)
                    }`}
                    staffId={`#${user.profile_data.staff_id}`}
                    showSmallModal={showSmallModal}
                    setShowSmallModal={() => setShowSmallModal(!showSmallModal)}
                    category={single_user?.userType}
                  />
                ))}
              </div>
            ) : (
              <>
                {/* No users */}
                <div className="w-8/12 flex flex-col items-center px-10 pt-10 pb-20 rounded-md overview-card">
                  <Image
                    src="/images/person.png"
                    alt=""
                    width={120}
                    height={120}
                    className="mb-5"
                  />
                  <p className="text-black font-semibold text-xl mb-5">
                    You have no users
                  </p>
                  <p className="text-black font-normal text-sm">
                    Add new users using the button above.
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
