import Image from "next/image";
import Link from "next/link";
import AppRoutes from "../../constants/app_routes";

export default function Header() {
  return (
    <>
      {/* Header */}
      <section className="w-full h-24 bg-white flex justify-between items-center px-16 shadow-md">
        <div className="flex items-center">
          <Image
            src="/images/pie-chart.png"
            alt="logo"
            width={70}
            height={70}
            className="w-14 h-11"
          />
          <h1 className="text-red-600 text-3xl font-bold">
            X<span className="text-black text-lg">pense Manager</span>
          </h1>
        </div>

        <nav className="flex flex-1 items-center justify-end mt-3">
          <Link href="" className="px-4 text-black text-md font-medium">
            Features
          </Link>
          <Link href="" className="px-4 text-black text-md font-medium">
            About Us
          </Link>
          <Link href="" className="px-4 text-black text-md font-medium">
            Careers
          </Link>
          <Link href="" className="px-4 text-black text-md font-medium">
            Learning Center
          </Link>

          <div className="h-5 border-2 border-gray-300 border-solid mx-4"></div>

          <div className="flex items-center">
            <Link
              href={AppRoutes.Login}
              className="px-4 text-black text-md font-medium"
            >
              Login
            </Link>
            <button
              type="button"
              className="w-full px-5 py-1 border-2 border-gray-300 border-solid rounded text-black hover:bg-red-800"
            >
              Register
            </button>
          </div>
        </nav>
      </section>
    </>
  );
};
