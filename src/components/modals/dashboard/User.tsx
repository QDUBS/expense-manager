import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IExpenseFormInputs } from "../../../interfaces/expense";
import { RootState } from "../../../redux/store/store";
import { profileUpdateFormSchema } from "../../../schemas/auth";
import LoadingSpinner from "../../loading/LoadingSpinner";

interface Props {
  onClose: () => void;
}

const User = ({ onClose }: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const profileDetails = useSelector((state: RootState) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(profileUpdateFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (expense: IExpenseFormInputs) =>
      axios.put(`/api/user`, expense),
    onSuccess: async (data: any) => {
      toast("User updated successfully");
      onClose();
    },
  });

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file) as any);
    setUploadedFile(file);

    if (file) {
      const fileName = file.name;
      setSelectedFileName(fileName);
    }
  };

  useEffect(() => {
    setValue("photo", profileDetails.profileDetails?.photo);
    setValue("firstName", profileDetails.profileDetails?.firstName);
    setValue("lastName", profileDetails.profileDetails?.lastName);
    setValue("mobileNumber", profileDetails.profileDetails?.mobileNumber);
    setValue("department", profileDetails.profileDetails?.department);
    setValue("role", profileDetails.profileDetails?.role);
    setValue("staffID", profileDetails.profileDetails?.staffID);
  }, []);

  const onSubmit = async (data: any) => {
    const {
      firstName,
      lastName,
      mobileNumber,
      department,
      role,
      staffID,
      photo,
    } = data;
    const formData = new FormData();

    if (uploadedFile) {
      formData.append("photo", uploadedFile);
    }

    let newData: any = {
      id: profileDetails.profileDetails?.id,
      firstName,
      lastName,
      mobileNumber,
      department,
      role,
      staffID,
      photo,
    };

    formData.append("data", JSON.stringify(newData));
    mutate(formData as any);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-3/5 bg-white rounded-md">
          <div className="flex flex-row justify-between items-center px-8 py-4 border-b-gray">
            <p className="text-black text-lg font-medium">Edit User</p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row px-8 pt-10 pb-12">
              <div className="w-full">
                <label className="flex flex-row gap-2 px-3 py-2 h-fit border-gray rounded-md text-sm md:text-base text-black cursor-pointer">
                  <Image
                    unoptimized={true}
                    width={20}
                    height={20}
                    src="/images/vuesax/linear/export.svg"
                    alt=""
                    className="w-5 h-5"
                  />
                  {profileDetails.profileDetails?.photo
                    ? "Change photo"
                    : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
                <p className="mt-2 mb-5">{selectedFileName}</p>

                <div className="flex flex-row justify-between mb-5">
                  <div className="w-full">
                    <div className="flex flex-row">
                      <p className="text-dark-grey text-sm font-normal">
                        Firstname
                      </p>
                      <p className="text-dark-grey text-sm font-normal">*</p>
                    </div>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full border-gray rounded-md px-2 py-2 mt-3"
                      {...register("firstName")}
                    />
                  </div>

                  <div className="w-full ml-4">
                    <div className="flex flex-row">
                      <p className="text-dark-grey text-sm font-normal">
                        Lastname
                      </p>
                      <p className="text-dark-grey text-sm font-normal">*</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Snow"
                      className="w-full border-gray rounded-md px-2 py-2 mt-3"
                      {...register("lastName")}
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-5">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">
                      Mobile number
                    </p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <input
                    type="text"
                    placeholder="0800 000 0000"
                    className="w-full border-gray rounded-md px-2 py-2 mt-3"
                    {...register("mobileNumber")}
                  />
                </div>

                <div className="w-full mb-5">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">
                      Department
                    </p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <select
                    className="w-full border-gray text-gray-400 rounded-md px-2 pt-2 pb-3 mt-3"
                    id="category-select"
                    {...register("department")}
                  >
                    <option value="software_informatics">
                      Software & Informatics
                    </option>
                    <option value="facilities_procurement">
                      Facilities & Procurement
                    </option>
                    <option value="human_resources">Human Resources</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                <div className="w-full mb-5">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">Role</p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Account Officer"
                    className="w-full border-gray rounded-md px-2 py-2 mt-3"
                    {...register("role")}
                  />
                </div>

                <div className="w-full mb-5">
                  <div className="flex flex-row">
                    <p className="text-dark-grey text-sm font-normal">
                      Staff ID
                    </p>
                    <p className="text-dark-grey text-sm font-normal">*</p>
                  </div>
                  <input
                    type="text"
                    placeholder="043"
                    className="w-full border-gray rounded-md px-2 py-2 mt-3"
                    {...register("staffID")}
                  />
                </div>
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

export default User;
