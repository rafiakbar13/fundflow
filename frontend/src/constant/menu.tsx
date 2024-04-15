interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

import { BsFillGridFill as Overview } from "react-icons/bs";
import { LuWallet as Balances } from "react-icons/lu";
import { GrTransaction as Transactions } from "react-icons/gr";
import { CiMoneyBill as Bills } from "react-icons/ci";
import { HiOutlineWallet as Expenses } from "react-icons/hi2";
import { TfiTarget as Goals } from "react-icons/tfi";
import { IoSettingsOutline as Settings } from "react-icons/io5";
export const Menu: MenuItem[] = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: <Overview />,
  },
  {
    name: "Balances",
    path: "/dashboard/balances",
    icon: <Balances />,
  },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
    icon: <Transactions />,
  },
  {
    name: "Bills",
    path: "/dashboard/bills",
    icon: <Bills />,
  },
  {
    name: "Expenses",
    path: "/dashboard/expenses",
    icon: <Expenses />,
  },
  {
    name: "Goals",
    path: "/dashboard/goals",
    icon: <Goals />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <Settings />,
  },
];
