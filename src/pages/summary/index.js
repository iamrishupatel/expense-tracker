import React from "react";
import { useSelector } from "react-redux";
import ExpenesByCategory from "../../components/ExpenesByCategory";
import PropTypes from "prop-types";
import s from "./Summary.module.css";

const SummaryPage = () => {
  const { monthlyExpByCategory, totalExpense } = useSelector(
    (state) => state.expense
  );
  return (
    <div className={s.container}>
      <ExpenesByCategory />

      <div className={s.items}>
        <h2>BreakDown</h2>
        {totalExpense === 0 && (
          <div className="placeholder">No expense found for this month</div>
        )}

        {monthlyExpByCategory
          .filter((item) => item.amount > 0)
          .map((item, index) => (
            <SummaryItem data={item} key={index} />
          ))}
      </div>
    </div>
  );
};
export default SummaryPage;

const SummaryItem = ({ data }) => {
  const emoji = data.label.split(" ")[0];

  return (
    <div className={s.summaryItem}>
      <div className={s.icon}>{emoji}</div>
      <div className={s.dets}>
        <p>{data.value}</p>
        <div className={s.amount}>
          {data.amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </div>
      </div>
    </div>
  );
};

SummaryItem.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};
