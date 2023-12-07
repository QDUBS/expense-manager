import Link from "next/link";
import AppRoutes from "../../constants/app_routes";

type Props = {
  id: string;
  staff: string;
  type: string;
  date: string;
  total: string;
  currency: string;
  stage: string;
  status: string;
};

const Expense = ({
  id,
  staff,
  type,
  date,
  total,
  currency,
  stage,
  status,
}: Props) => {
  return (
    <Link
      href={{
        pathname: `${AppRoutes.Expenses}/${id}`,
        query: {
          id: id,
        },
      }}
      className="w-full flex flex-row items-center px-3 py-4 border-b-gray cursor-pointer hover:bg-gray-100"
    >
      <p className="w-1/3 text-gray text-sm">{staff}</p>
      <p className="w-1/3 text-gray text-sm">{type}</p>
      <p className="w-1/3 text-gray text-sm">{date}</p>
      <p className="w-1/3 text-gray text-sm">
        {currency}{" "}
        {total}
      </p>
      <p className="w-1/3 text-gray text-sm">{stage}</p>
      <p className="w-1/3 text-gray text-sm">{status}</p>
    </Link>
  );
};

export default Expense;
