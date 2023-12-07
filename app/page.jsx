import Header from "/src/components/common/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />

      {/* Welcome */}
      <section className="flex-col justify-between h-full">
        <div className="w-full h-full flex justify-center items-center pt-20 pb-40 px-32">
          <div className="w-7/12 flex-col justify-center">
            <div className="w-16 h-2 bg-red-800 my-5"></div>
            <h1 className="text-black text-5xl font-semibold leading-tight">
              The Money App That Works For You
            </h1>
            <p className="w-9/12 text-black text-md font-normal my-5">
              Managing money is hard, but you don't have to do it alone. Xpense
              Manager empowers you to save more, spend less, see everything, and
              take back control of your financial life.
            </p>

            <button
              type="button"
              className="w-fit h-12 bg-red-800 text-white text-md font-medium px-5 border-0 rounded"
            >
              Get Started
            </button>
          </div>

          <div>
            <img src="/images/expense.jpg" alt="pie-chart" />
          </div>
        </div>

        <div className="w-full h-48 bg-neutral-900"></div>
      </section>
    </main>
  );
}
