import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { SET_BUDGET_MODAL } from "../../redux/features/appSlice";

// styles
import s from "./Budget.module.css";

const BudgetCard = () => {
  const dispatch = useDispatch();

  const { monthlyBudget } = useSelector((state) => state.budget);
  const { totalExpense } = useSelector((state) => state.expense);

  const [chartData, setChartData] = useState({
    options: {
      colors: ["#004EFF", "#FA4D14"],
      labels: ["Remaining Budget", "Used Budget"],
      dataLabels: {
        style: {
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        },
      },
      tooltip: {
        enabled: true,
        style: {
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        },
        y: {
          formatter: () => {},
          title: {
            formatter: (value, { series, seriesIndex }) => {
              return `${value} ${series[seriesIndex].toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}`;
            },
          },
        },
      },
      legend: {
        fontFamily: "Poppins",
        fontWeight: 600,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "40%",
          },
        },
      },
      responsive: [
        {
          breakpoint: "600px",
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },

    series: [Number(monthlyBudget - totalExpense), totalExpense],
  });

  useEffect(() => {
    setChartData((prevState) => ({
      ...prevState,
      series: [Number(monthlyBudget - totalExpense), totalExpense],
    }));
  }, [monthlyBudget, totalExpense]);

  return (
    <div className={s.card}>
      <div className={s.header}>
        <h3>Budget</h3>
        <div onClick={() => dispatch(SET_BUDGET_MODAL(true))}>
          <FaRegEdit style={{ display: "flex", fontSize: 20 }} />
          <span>Edit Budget</span>
        </div>
      </div>
      {monthlyBudget > 0 || totalExpense > 0 ? (
        <Chart
          className={s.chart}
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height={180}
        />
      ) : (
        <div className="placeholder">Add some Expense or a budget</div>
      )}
    </div>
  );
};

export default BudgetCard;
