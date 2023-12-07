import { BiChevronDown } from "react-icons/bi";
import Layout from "../../../../src/components/dashboard/Layout";
import { GoDotFill } from "react-icons/go";
import { MdEdit } from "react-icons/md";

const Page = () => {
  return (
    <>
      <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
        <p className="pt-0 font-normal text-2xl lg:text-2xl">Settings</p>
      </div>

      <div className="py-10">
        <div className="flex flex-row px-6 mb-10">
          <div className="w-full h-60 rounded-md border border-\[\#A9A6DC\]\/80">
            <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
              <p className="text-black text-lg font-normal">ACCOUNT DETAILS</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-black text-lg font-normal">
                Confidence Isaiah
              </p>
              <p className="text-gray-500 text-md font-normal">
                qdubsmusk@gmail.com
              </p>
            </div>
          </div>

          <div className="w-full h-60 rounded-md border border-\[\#A9A6DC\]\/80 ml-8">
            <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
              <p className="text-black text-lg font-normal">
                COMPANY INFORMATION
              </p>
              <button>
                <MdEdit color="#fa8128" size={30} />
              </button>
            </div>
            <div className="px-4 py-4">
              <p className="text-black text-lg font-normal">Employer:</p>
              <p className="text-gray-500 text-md font-normal mb-8">
                EHA Clinics
              </p>

              <p className="text-black text-lg font-normal">
                Employer Address:
              </p>
              <p className="text-gray-500 text-md font-normal">
                12 Asba & Dantata Street, Lifecamp, Abuja, F.C.T
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row px-6">
          <div className="w-full h-60 rounded-md border border-\[\#A9A6DC\]\/80 mb-6">
            <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
              <p className="text-black text-lg font-normal">
                EMPLOYEE INFORMATION
              </p>
              <button>
                <MdEdit color="#fa8128" size={30} />
              </button>
            </div>

            <div className="flex flex-row px-4 py-4">
              <div className="w-6/12">
                <p className="text-black text-lg font-normal">Department:</p>
                <p className="text-gray-500 text-md font-normal mb-4">
                  Informatics
                </p>

                <p className="text-black text-lg font-normal">Role:</p>
                <p className="text-gray-500 text-md font-normal mb-4">
                  Software Engineer
                </p>
              </div>

              <div className="w-6/12">
                <p className="text-black text-lg font-normal">Staff ID:</p>
                <p className="text-gray-500 text-md font-normal">#0391</p>
              </div>
            </div>
          </div>

          <div className="w-full h-60 flex flex-col rounded-md border border-\[\#A9A6DC\]\/80 mb-6 ml-8">
            <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
              <p className="text-black text-lg font-normal">
                NEWSLETTER PREFERENCES
              </p>
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <p className="text-black text-lg font-normal px-4 pt-4 mb-0">
                You are currently not subscribed to any of our newsletters.
              </p>

              <p className="bg-gray-100 text-orange text-md font-normal p-4 cursor-pointer">
                EDIT NEWSLETTER PREFERENCES
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Settings = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Settings;
