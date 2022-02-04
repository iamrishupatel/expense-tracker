import React from "react";
import { useSelector } from "react-redux";
import ExpenseItem from "../ExpenseItem";

import s from "./RecentExp.module.css";

const RecentExpenses = () => {
  const { monthlyExpenses, totalExpense } = useSelector(
    (state) => state.expense
  );
  return (
    <div className={s.recent}>
      <h2>Expenses</h2>
      <div className={s.expenses}>
        {monthlyExpenses.map((expense) => (
          <ExpenseItem key={expense.id} data={expense} />
        ))}
        {totalExpense === 0 && (
          <div className="placeholder">No expense found for this month</div>
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
