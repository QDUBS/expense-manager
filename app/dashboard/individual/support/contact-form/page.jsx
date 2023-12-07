import Layout from "src/components/dashboard/Layout";
import { AiFillPhone } from "react-icons/ai";
import { CgNametag } from "react-icons/cg";
import { IoMail } from "react-icons/io5";

const Page = () => {
  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Contact Form</p>
        </div>

        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-4/5 px-8 pt-10">
            <div className="flex flex-row card-overview">
              {/* Form */}
              <form className="bg-purplestrong-lighter p-8 pt-10 contact-left-side">
                <p className="text-white text-2xl font-semibold mb-10">
                  Write Us
                </p>

                <div className="mb-10">
                  <select
                    className="border-dark-gray flex flex-row justify-between text-gray-400 rounded-md px-2 py-3 w-full mt-3"
                    id="input-border-bottom-transparent"
                  >
                    <option>Issue</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div className="mb-10">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-md border-dark-gray text-grey px-3 py-3 mt-3"
                    id="input-border-bottom-transparent"
                  />
                </div>

                <div className="mb-20">
                  <textarea
                    placeholder="Message"
                    rows={5}
                    className="w-full rounded-md border-dark-gray text-grey px-3 pt-2 mt-3 textarea-resize"
                    id="input-border-bottom-transparent"
                  ></textarea>
                </div>

                <div className="w-full flex flex-row items-center justify-between mt-10 mb-4">
                  <div className="flex flex-row">
                    <p className="text-gray-400 text-md font-normal">*</p>
                    <p className="text-gray-400 text-md font-normal">
                      This field is mandatory
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <button className="send-message-button ml-2 rounded-md">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

              {/* Contact Info */}
              <div className="bg-purplestrong p-8 pt-10 contact-right-side">
                <div className="mb-10">
                  <p className="font-semibold text-2xl text-white mb-3">
                    Contact Information
                  </p>
                  <p className="font-normal text-md text-gray-400">
                    We are open to handle your issues, welcome suggestions or
                    just to have a chat
                  </p>
                </div>

                <div className="mt-16">
                  <div className="flex flex-row items-center mb-7">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <CgNametag color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Name:
                    </p>
                    <p className="font-normal text-md text-gray-400 ml-2">
                      Confidence Isaiah
                    </p>
                  </div>

                  <div className="flex flex-row items-center mb-7">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <AiFillPhone color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Phone:
                    </p>
                    <p className="font-normal text-md text-gray-400 ml-2">
                      +2349034107411
                    </p>
                  </div>

                  <div className="flex flex-row items-center">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <IoMail color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Email:
                    </p>
                    <p className="font-normal text-md text-gray-400 ml-2">
                      qdubsmusk@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const SupportTicket = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default SupportTicket;
