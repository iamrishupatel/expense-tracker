import React from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";

// styles
import s from "./Spend.module.css";

const SpendCard = () => {
  const { totalExpense } = useSelector((state) => state.expense);
  const { monthlyBudget } = useSelector((state) => state.budget);

  const month = format(new Date(), "MMM");

  return (
    <div className={s.card}>
      <p>{`Spends in ${month}`}</p>
      <div className={s.expense}>
        <h1>
          {totalExpense.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </h1>
        <span>
          /
          {monthlyBudget.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </span>
      </div>
      <p className={s.month}>{month.slice(0, 3)}</p>
    </div>
  );
};
export default SpendCard;
