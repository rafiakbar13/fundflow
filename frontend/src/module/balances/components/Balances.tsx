import Header from "@/components/Header";
import React from "react";
import BalanceItems from "./BalanceItems";

type Props = {};

const Balances = (props: Props) => {
  return (
    <div className="p-5">
      <Header title="Balances" />
      <div className="pt-3">
        <BalanceItems />
      </div>
    </div>
  );
};

export default Balances;
