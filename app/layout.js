import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../src/redux/provider/provider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Manager",
  description: "Manage your expenses the smart way",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
