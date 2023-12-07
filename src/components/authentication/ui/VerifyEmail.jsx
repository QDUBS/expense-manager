import { useRouter } from "next/router";
import Background from "@components/Background";
import Header from "@components/nav/Header";
import Image from "next/image";

const VerifyEmail = ({ title, message, url, action }) => {
  const router = useRouter();

  return (
    <>
      <Header title="Verify your email" />
      <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
        <div className="bg-white px-5 py-8 md:p-10 rounded-md w-full md:max-w-[500px] lg:max-w-[550px]">
          <div className="flex flex-col items-center">
            <Image
              unoptimized={true}
              width={160}
              height={160}
              src="/images/emailimage.png"
              alt=""
              className="w-36 h-auto md:w-40 -ml-5"
            />
            <h2 className="text-xl mt-4 text-center md:text-2xl lg:text-3xl">
              {title}
            </h2>
            <p className="max-w-md text-center mt-5">{message}</p>

            {url && (
              <div className="flex flex-row items-center gap-2 mt-7 md:mt-12">
                <button
                  onClick={() => router.push(url)}
                  className="px-4 py-2 rounded-full bg-[#FFE9E9] text-[#BF0B0B] hover:bg-[#FFE9E9]/50"
                >
                  {action}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default VerifyEmail;
