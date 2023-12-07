"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded, BiSolidUser } from "react-icons/bi";
import { BsChatFill } from "react-icons/bs";
import { FaChartLine, FaCircleUser } from "react-icons/fa6";
import { FiHelpCircle, FiSettings } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoMail } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RiFileListFill } from "react-icons/ri";
import { SiAcclaim } from "react-icons/si";
import AppRoutes from "../../../src/constants/app_routes";
import NavItem from "./NavItem";

const SideNav = () => {
  const { data } = useSession();
  const router = useRouter();
  const [user, setUser] = useState();
  const [active, setActive] = useState("Expenses");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logout = () => {
    signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/login`,
    });
  };

  useEffect(() => {
    setUser(data?.user?.user?.user);
  }, [data?.user, user]);

  return (
    <>
      {/* <section className="w-[17%] h-screen bg-[#290742] py-8 relative"> */}
      <section className="bg-[#290742] fixed bottom-0 w-full py-7 left-0 md:fixed md:bottom-0 lg:sticky lg:left-0 lg:top-0 lg:w-1/5 lg:h-screen font-thin">
        <div className="relative">
          <div className="w-full flex flex-col items-center">
            {user?.profile_data?.photo ? (
              <div className="w-16 h-16 bg-white rounded-full mb-3">
                <FaCircleUser color="#03dffc" size={64} />
              </div>
            ) : (
              <div className="w-16 h-16 bg-white rounded-full mb-3">
                <FaCircleUser color="#03dffc" size={64} />
              </div>
            )}
            <p className="text-white text-md text-center font-normal">
              {user?.email}
            </p>
          </div>

          <div className="mt-12">
            <NavItem
              icon={
                <BiSolidUser
                  color={active === "Users" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Users"
              onclick={() => setActive("Users")}
              active={active}
              route={AppRoutes.Users}
            />
            <NavItem
              icon={
                <SiAcclaim
                  color={active === "Claims" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Claims"
              onclick={() => setActive("Claims")}
              active={active}
              route={AppRoutes.Claims}
            />
            <NavItem
              icon={
                <RiFileListFill
                  color={active === "Expenses" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Expenses"
              onclick={() => setActive("Expenses")}
              active={active}
              route={AppRoutes.Expenses}
            />
            <NavItem
              icon={
                <FaChartLine
                  color={active === "Outliers" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Outliers"
              onclick={() => setActive("Outliers")}
              active={active}
              route={AppRoutes.Outliers}
            />
            {/* <NavItem
              icon={
                <TbReport
                  color={active === "Reports" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Reports"
              onclick={() => setActive("Reports")}
              active={active}
              route={AppRoutes.Reports}
            /> */}
            <NavItem
              icon={
                <IoMail
                  color={active === "Inbox" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Inbox"
              onclick={() => setActive("Inbox")}
              active={active}
              route={AppRoutes.Inbox}
            />
            <NavItem
              icon={
                <BsChatFill
                  color={active === "Support" ? "#03dffc" : "#94a3b8"}
                  size={22}
                />
              }
              title="Support"
              onclick={() => setActive("Support")}
              active={active}
              route={AppRoutes.Support}
            />
          </div>
        </div>

        <div className="w-full p-2 absolute bottom-0">
          {showLogoutModal && (
            <div className="bg-black w-full rounded-md mb-2">
              <div
                className="flex flex-row items-center px-2 py-5 hover-logout-modal"
                onclick={() => router.push(AppRoutes.Settings)}
              >
                <FiSettings color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Settings</p>
              </div>

              <div className="flex flex-row items-center px-2 py-5 hover-logout-modal">
                <FiHelpCircle color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Help</p>
              </div>

              <div
                className="flex flex-row items-center px-2 py-5 hover-logout-modal border-t-dark-gray"
                onClick={logout}
              >
                <LuLogOut color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Log out</p>
              </div>
            </div>
          )}

          <div
            className={
              showLogoutModal
                ? "bg-very-dark-gray w-full h-24 px-2 flex flex-row items-center justify-between py-4 rounded-md relative cursor-pointer"
                : "w-full h-24 px-2 flex flex-row items-center justify-between py-4 relative cursor-pointer"
            }
            onClick={() => setShowLogoutModal(!showLogoutModal)}
          >
            <h2 className="flex flex-row app-name">
              <p className="text-white text-2xl font-bold">Bill Blitzer</p>
              <GoDotFill color="#ffffff" size={22} className="dot" />
            </h2>
            <BiDotsHorizontalRounded color="#fff" size={22} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SideNav;
