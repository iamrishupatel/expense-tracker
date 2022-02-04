import React, { Fragment } from "react";

import SpendCard from "../../components/SpendCard";
import BudgetCard from "../../components/BudgetCard";
import ExpenesByCategory from "../../components/ExpenesByCategory";
import RecentExpenses from "../../components/RecentExpenses";

import s from "./Home.module.css";

const HomePage = () => {
  return (
    <Fragment>
      <div className={s.home}>
        <div className={s.cards}>
          <SpendCard />
          <BudgetCard />
        </div>

        <div className={s.category}>
          <ExpenesByCategory showDets />
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <RecentExpenses />
      </div>
    </Fragment>
  );
};

export default HomePage;
