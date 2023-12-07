import Image from "next/image";
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "../../loading/LoadingSpinner";
import { IExpenseFormInputs } from "../../../interfaces/expense";
import AppRoutes from "../../../constants/app_routes";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { expenseFormSchema } from "../../../schemas/expense";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
}

const ManualExpense = ({ onClose }: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(expenseFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (expense: IExpenseFormInputs) =>
      axios.post(`/api/expenses`, expense),
    onSuccess: async (data: any) => {
      toast("Expense added successfully");
      onClose();
    },
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file) as any);
    setUploadedFile(file);
    setValue("receipt", file!!);

    if (file) {
      const fileName = file.name;
      setSelectedFileName(fileName);
    }
  };

  useEffect(() => {
    setValue("receipt", selectedFile!!);
  }, [selectedFile]);

  const onSubmit = async (data: IExpenseFormInputs | any) => {
    const { merchant, total, currency, category, description } = data;
    const formData = new FormData();

    if (uploadedFile) {
      formData.append("receipt", uploadedFile);
    }

    let newData: any = {
      merchant,
      total,
      currency,
      category,
      description,
      filename: "",
    };

    formData.append("data", JSON.stringify(newData));
    mutate(formData as any);
    onClose();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row px-8 pt-10 pb-12">
              <div className="w-8/12">
                <div className="flex flex-col mb-5">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">
                      Merchant
                    </p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Merchant name"
                    className="w-full border-gray rounded-md px-2 py-2 mt-3"
                    {...register("merchant")}
                  />
                </div>

                <div className="flex flex-col mb-5">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">Date</p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <input
                    type="date"
                    placeholder="Date"
                    className="w-full border-gray text-gray-400 rounded-md px-2 py-2 mt-3"
                  />
                </div>

                <div className="flex flex-row justify-between mb-5">
                  <div className="w-full">
                    <div className="flex flex-row">
                      <p className="text-dark-grey text-sm font-normal">
                        Total
                      </p>
                      <p className="text-dark-grey text-sm font-normal">*</p>
                    </div>
                    <input
                      type="number"
                      placeholder="Total"
                      className="w-full border-gray rounded-md px-2 py-2 mt-3"
                      {...register("total")}
                    />
                  </div>

                  <div className="w-full ml-4">
                    <div className="flex flex-row">
                      <p className="text-dark-grey text-sm font-normal">
                        Currency
                      </p>
                      <p className="text-dark-grey text-sm font-normal">*</p>
                    </div>
                    <select
                      className="w-full border-gray text-gray-400 rounded-md px-2 pt-2 pb-3 mt-3"
                      id="category-select"
                      {...register("currency")}
                    >
                      {/* <option value="ngn">NGN ₦‎</option> */}
                      <option value="gbp">GBP £</option>
                      <option value="usd">USD $</option>
                    </select>
                  </div>
                </div>

                <div className="w-full mb-5">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">
                      Category
                    </p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <select
                    className="w-full border-gray text-gray-400 rounded-md px-2 pt-2 pb-3 mt-3"
                    id="category-select"
                    {...register("category")}
                  >
                    <option value="transportation">
                      Travel & Transportation
                    </option>
                    <option value="food">Food</option>
                    <option value="supplies">Supplies</option>
                    <option value="utilities">Utilities</option>
                    <option value="miscellaneous">Miscellaneous</option>
                  </select>
                </div>

                <div className="w-full">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">
                      Description
                    </p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <textarea
                    cols={8}
                    placeholder="Description"
                    className="w-full border-gray rounded-md px-2 py-2 mt-3 resize-none"
                    {...register("description")}
                  />
                </div>
              </div>

              {/* Upload receipt */}
              <div className="w-4/12 flex flex-col justify-center items-center border-gray rounded-md ml-10">
                <div className="relative">
                  <div className="bg-gray-100 p-10 rounded-full cursor-pointer relative">
                    <Image
                      src="/images/add-expense.png"
                      alt=""
                      width={170}
                      height={170}
                    />
                  </div>
                  <div className="w-full h-receipt-container absolute top-0">
                    <input
                      type="file"
                      className="w-full h-receipt"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <p className="text-gray-500 text-md text-center font-normal mt-3">
                  {selectedFileName}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-between px-8 pb-10">
              <div className="flex flex-row">
                <p className="text-gray-500 text-md font-normal">*</p>
                <p className="text-gray-500 text-md font-normal">
                  This field is mandatory
                </p>
              </div>

              <div className="flex flex-row">
                <button className="finish-button ml-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ManualExpense;
