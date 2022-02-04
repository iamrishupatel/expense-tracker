import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "artemis-ui";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import format from "date-fns/format";
import PropTypes from "prop-types";
import { removeExpense } from "../../redux/features/expenseSlice";
import categoryOptions from "../../categoryOptions";
// styles
import s from "./ExpItem.module.css";

const ExpenseItem = ({ data }) => {
  const { id } = useSelector((state) => state.auth);
  const { category, createdAt } = data;
  console.log("type", typeof createdAt);

  const categoryBadge = category.charAt(0).toUpperCase() + category.slice(1);
  const emoji = categoryOptions
    .filter((option) => option.value === category)[0]
    .label.split(" ")[0];
  const timestamp = format(createdAt, "dd MMM");

  const handleDelete = () => {
    removeExpense(id, data.id)
      .then(() => toast.success("Deleted Successfully"))
      .catch((e) => console.log(e));
  };

  return (
    <div className={s.container}>
      <div className={s.icon}>{emoji}</div>
      <div className={s.dets}>
        <div className={s.badge}>
          <Badge variant="dark-light" size="sm">
            📅 {timestamp}
          </Badge>
          <Badge variant="dark-light" size="sm" style={{ fontSize: "0.8rem" }}>
            {categoryBadge}
          </Badge>
        </div>
        <p>{data.title}</p>
      </div>
      <div className={s.amount}>
        {data.amount.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </div>

      <div className={s.del} onClick={handleDelete}>
        <AiFillDelete />
      </div>
    </div>
  );
};

export default ExpenseItem;

ExpenseItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
