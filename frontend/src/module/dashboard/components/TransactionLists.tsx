import React from "react";
import { AiOutlineShopping as ShoppingBag } from "react-icons/ai";
import { convertToIndonesianTime, toRupiah } from "@/lib/utils";

interface Transaction {
  id: string;
  items: string;
  amount: number;
  type: string;
  status: string;
  paymentMethod: string;
  date: string;
  expensesId: string;
  accountId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <>
      {transactions.map((transaction: Transaction) => (
        <div key={transaction.id} className="flex items-center gap-x-3">
          <div className="p-2 rounded bg-slate-200 w-fit">
            <ShoppingBag size={18} />
          </div>
          <div className="w-2/3">
            <p>{transaction.items}</p>
          </div>
          <div className="text-right">
            <p>{toRupiah(transaction.amount)}</p>
            <p className="text-sm text-gray-400 whitespace-nowrap">
              {convertToIndonesianTime(transaction.date)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TransactionList;
