"use client";

import Image from "next/image";
import { IoClose } from "react-icons/io5";
import SingleExpense from "../../dashboard/SingleExpense";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

const MultipleExpenses = ({ onClose }: Props) => {
  const [value, setValue] = useState("");

  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-3/5 bg-white rounded-md">
          <div className="flex flex-row justify-between items-center px-8 py-4 border-b-gray">
            <p className="text-black text-lg font-semibold">New Expense</p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <form>
            <div className="flex flex-row px-8 pt-4">
              <p className="py-2 w-1/3 text-black font-semibold text-sm">
                MERCHANT
              </p>
              <p className="py-2 w-1/3 text-black text-center font-semibold text-sm">
                DATE
              </p>
              <p className="py-2 w-1/3 text-black text-center font-semibold text-sm">
                TOTAL
              </p>
              <p className="py-2 w-1/3 text-black text-center font-semibold text-sm">
                CURRENCY
              </p>
              <p className="py-2 w-1/3 text-black text-center font-semibold text-sm">
                CATEGORY
              </p>
              <p className="py-2 w-1/3 text-black text-center font-semibold text-sm">
                DESCRIPTION
              </p>
            </div>

            <div className="flex flex-col px-8 pt-2 pb-12">
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
              <SingleExpense
                value={value}
                setValue={(e) => setValue(e.target.value)}
              />
            </div>

            <div className="w-full px-8 pb-10">
              <div className="w-full flex flex-row justify-between">
                <button className="reset-button">Reset</button>
                <button className="finish-button ml-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default MultipleExpenses;
