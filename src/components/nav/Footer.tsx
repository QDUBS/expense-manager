import { AppRoutes } from "@constants/app_routes";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container-body bg-black">
      {/* Entire footer div */}
      <div className="flex flex-col py-11 space-y-5 justify-center items-center md:items-start md:justify-between md:max-w-full">
        <div className="flex flex-col md:min-w-full md:flex-row md:justify-between">
          {/* Footer div for Logo and tagline */}
          <div className="flex flex-col justify-center items-center text-white md:items-start md:justify-start">
            <h3 className="text-2xl font-bold md:mt-4">Recruitment Platform</h3>
            <p className="text-gray-300">
              This is where the company tagline would go
            </p>
          </div>

          {/* Div for right footer items */}
          <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-32 md:justify-start">
            {/* Item 1 */}
            <div className="flex flex-col mt-7 justify-center items-center md:justify-start md:items-start">
              <h3 className="text-white">Quick links</h3>
              <p className="small text-inactive mt-5 hover:text-white">
                <Link href={AppRoutes.Courses}>Courses</Link>
              </p>
              <p className="small text-inactive mt-3 hover:text-white">
                <Link href={AppRoutes.FindWork}>Find work</Link>
              </p>
              <p className="small text-inactive mt-3 hover:text-white">
                <Link href={AppRoutes.FindTalent}>Find talent</Link>
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col mt-7 justify-center items-center md:justify-start md:items-start">
              <h3 className="text-white">Company</h3>
              <p className="small text-inactive mt-5 hover:text-white">
                <Link href={AppRoutes.About}>About us</Link>
              </p>
              <p className="small text-inactive mt-3 hover:text-white">
                <Link href={AppRoutes.Blog}>Blog</Link>
              </p>
              <p className="small text-inactive mt-3 hover:text-white">
                <Link href={AppRoutes.TermsConditions}>
                  Terms and conditions
                </Link>
              </p>
              <p className="small text-inactive mt-3 hover:text-white">
                <Link href={AppRoutes.PrivacyPolicy}>Privacy policy</Link>
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col mt-7 justify-center items-center md:justify-start md:items-start">
              <h3 className="text-white">Help</h3>
              <p className="small text-inactive mt-5 hover:text-white">
                <Link href={AppRoutes.Contact}>Contact us</Link>
              </p>
              <p className="small text-inactive mt-3 hover:text-white">
                <Link href={AppRoutes.FAQ}>FAQs</Link>
              </p>
            </div>
          </div>
        </div>

        <p className="small text-inactive mt-7">Powered by EHA Clinics</p>
      </div>
    </footer>
  );
}
