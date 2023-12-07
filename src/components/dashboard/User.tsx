import { BiDotsHorizontalRounded } from "react-icons/bi";
import AppRoutes from "../../constants/app_routes";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  department: string;
  role: string;
  staffId: string;
  category: string;
  showSmallModal: boolean;
  setShowSmallModal: () => void;
};

const User = ({
  id,
  name,
  department,
  role,
  staffId,
  category,
  showSmallModal,
  setShowSmallModal,
}: Props) => {
  return (
    <Link
      href={{
        pathname: `${AppRoutes.Users}/${id}`,
        query: {
          id: id,
        },
      }}
      className="w-full flex flex-row items-center px-3 py-4 border-b-gray cursor-pointer"
    >
      <p className="w-1/3 text-gray text-sm">{name}</p>
      <p className="w-1/3 text-gray text-sm">{department}</p>
      <p className="w-1/3 text-gray text-sm">{role}</p>
      <p className="w-1/3 text-gray text-sm">{staffId}</p>
      <p className="w-1/3 text-gray text-sm">{category}</p>
    </Link>
  );
};

export default User;
