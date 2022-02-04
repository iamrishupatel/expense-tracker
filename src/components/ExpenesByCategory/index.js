import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// styles
import s from "./ExpByCat.module.css";

const ExpenesByCategory = ({ showDets }) => {
  const { totalExpense, monthlyExpByCategory } = useSelector(
    (state) => state.expense
  );

  const [chartData, setChartData] = useState({
    series: monthlyExpByCategory
      .filter((exp) => exp.amount > 0)
      .map((exp) => exp.amount),
    options: {
      colors: monthlyExpByCategory
        .filter((exp) => exp.amount > 0)
        .map((exp) => exp.color),
      labels: monthlyExpByCategory
        .filter((exp) => exp.amount > 0)
        .map((exp) => exp.label),
      tooltip: {
        enabled: true,
        style: {
          display: "flex",
          alignItems: "center",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        },
        onDatasetHover: {
          highlightDataSeries: false,
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
      dataLabels: {
        style: {
          fontSize: "14px",
          fontFamily: "Poppins",
          fontWeight: "bold",
        },
      },
      legend: {
        fontFamily: "Poppins",
        position: "bottom",
        fontWeight: 700,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
          },
        },
      },
    },
  });

  useEffect(() => {
    setChartData((prevState) => ({
      ...prevState,
      series: monthlyExpByCategory
        .filter((exp) => exp.amount > 0)
        .map((exp) => exp.amount),
      options: {
        ...prevState.options,
        colors: monthlyExpByCategory
          .filter((exp) => exp.amount > 0)
          .map((exp) => exp.color),
        labels: monthlyExpByCategory
          .filter((exp) => exp.amount > 0)
          .map((exp) => exp.label),
      },
    }));
  }, [totalExpense]);

  if (totalExpense === 0) {
    return (
      <div className={s.container}>
        <h2>Categories</h2>
        <div className="placeholder">Please add some expenses.</div>
      </div>
    );
  }
  return (
    <div className={s.container}>
      <h2>Categories</h2>

      <Chart
        className={s.chart}
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={showDets ? 270 : 320}
      />
      {showDets && (
        <Link className={s.summary} to="/summary">
          See Detailed Summary
        </Link>
      )}
    </div>
  );
};

export default ExpenesByCategory;

ExpenesByCategory.propTypes = {
  showDets: PropTypes.bool,
};

ExpenesByCategory.defaultProps = {
  showDets: false,
};
