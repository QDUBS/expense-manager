import Link from "next/link";

const NavItem = ({ icon, title, onclick, active, route }) => {
  return (
    <>
      {active === title ? (
        <Link
          href={`${route}`}
          className="w-full h-12 flex items-center px-5 py-4 mt-8 cursor-pointer"
          onClick={onclick}
        >
          <div>{icon}</div>
          <p className="text-white font-semibold text-sm ml-5">{title}</p>
        </Link>
      ) : (
        <Link
          href={`${route}`}
          className="w-full h-12 flex items-center px-5 py-4 mt-8 cursor-pointer"
          onClick={onclick}
        >
          <div>{icon}</div>
          <p className="text-slate-400 font-semibold text-sm ml-5">{title}</p>
        </Link>
      )}
    </>
  );
};

export default NavItem;
