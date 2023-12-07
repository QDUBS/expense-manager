"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ExpenseChart from "../../../../src/components/dashboard/ExpenseChart";
import Layout from "../../../../src/components/dashboard/Layout";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";

const Page = () => {
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [expenses, setExpenses] = useState();
  const [highOutliers, setHighOutliers] = useState([]);
  const [lowOutliers, setLowOutliers] = useState([]);
  const [frequentOutliers, setFrequentOutliers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [activeTab, setActiveTab] = useState("HIGH");

  const { isLoading, error } = useQuery({
    queryKey: ["get-expenses"],
    queryFn: () => axios.get(`/api/expenses`),
    onSuccess: (data) => {
      setExpenses(data.data);
    },
  });

  const getHighOutliers = (expenses) => {
    expenses?.forEach((expense) => {
      if (
        (expense.total > 10000 && expense.category === "transportation") ||
        (expense.total > 50 && expense.category === "food") ||
        (expense.total > 100 && expense.category === "supplies") ||
        (expense.total > 100 && expense.category === "utilities") ||
        (expense.total > 10 && expense.category === "miscellaneous")
      ) {
        if (
          !highOutliers.some(
            (existingExpense) => existingExpense.id === expense.id
          )
        ) {
          setHighOutliers([...highOutliers, expense]);
        }
      }
    });
  };

  const getLowOutliers = (expenses) => {
    expenses?.forEach((expense) => {
      if (
        (expense.total < 100 && expense.category === "transportation") ||
        (expense.total < 10 && expense.category === "food") ||
        (expense.total < 20 && expense.category === "supplies") ||
        (expense.total < 30 && expense.category === "utilities") ||
        (expense.total < 30 && expense.category === "miscellaneous")
      ) {
        if (
          !lowOutliers.some(
            (existingExpense) => existingExpense.id === expense.id
          )
        ) {
          setLowOutliers([...lowOutliers, expense]);
        }
      }
    });
  };

  const getFrequentOutliers = (expenses) => {
    expenses?.filter((expense) => {
      return;
    });
  };

  useEffect(() => {
    getHighOutliers(expenses);
    getLowOutliers(expenses);
    getFrequentOutliers(expenses);

    console.log("High Outliers:", highOutliers);
    console.log("Low Outliers:", lowOutliers);
    console.log("Frequent Outliers:", frequentOutliers);
  }, [expenses]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Outliers</p>
        </div>

        {/* Outliers */}
        <div>
          <div className="flex flex-row justify-center w-full py-10">
            <p
              className={
                activeTab == "HIGH"
                  ? `text-purplestrong text-md font-normal cursor-pointer border-b-purplestrong`
                  : `text-grey text-md font-normal cursor-pointer`
              }
              onClick={() => setActiveTab("HIGH")}
            >
              HIGH
            </p>
            <p
              className={
                activeTab == "LOW"
                  ? `text-purplestrong text-md font-normal cursor-pointer ml-12 border-b-purplestrong`
                  : `text-grey text-md font-normal cursor-pointer ml-12`
              }
              onClick={() => setActiveTab("LOW")}
            >
              LOW
            </p>
            <p
              className={
                activeTab == "FREQUENT"
                  ? `text-purplestrong text-md font-normal cursor-pointer ml-12 border-b-purplestrong`
                  : `text-grey text-md font-normal cursor-pointer ml-12`
              }
              onClick={() => setActiveTab("FREQUENT")}
            >
              FREQUENT
            </p>
          </div>

          {/* High Outliers */}
          {activeTab == "HIGH" && (
            <div className="px-10 pb-10">
              <ExpenseChart claims={highOutliers} outliers={highOutliers} />
            </div>
          )}

          {/* Low Outliers */}
          {activeTab == "LOW" && (
            <div className="px-10 pb-10">
              <ExpenseChart claims={lowOutliers} outliers={lowOutliers} />
            </div>
          )}

          {/* Frequent Outliers */}
          {activeTab == "FREQUENT" && (
            <div className="px-10 pb-10">
              <ExpenseChart
                claims={frequentOutliers}
                outliers={frequentOutliers}
              />
            </div>
          )}
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
