import React from "react";
import { Button, Input, Option, Select } from "artemis-ui";
import { useSelector } from "react-redux";
import { createExpense } from "../../redux/features/expenseSlice";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Formik } from "formik";

import s from "./AddExp.module.css";
import categoryOptions from "../../categoryOptions";

const AddExpense = () => {
  const { id } = useSelector((state) => state.auth);

  const initialValues = {
    title: "",
    amount: 0,
    category: categoryOptions[0].value,
  };

  const validationSchema = yup.object({
    title: yup
      .string()
      .required("Title is required")
      .max(30, "Must be 30 characters or less"),
    amount: yup
      .string()
      .required("Amount is required")
      .max(6, "Must be 6 characters or less"),
  });

  const handleSubmit = (values, actions) => {
    const toastId = toast.loading("Creating...");
    createExpense(id, values).then(() => {
      toast.success("Created", {
        id: toastId,
      });
      actions.resetForm();
      actions.setSubmitting(false);
    });
  };

  return (
    <div className={s.add}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Input
              label="Title"
              placeholder="What is this expense for"
              shape="rounded"
              name="title"
              required
              value={values.title}
              onChange={handleChange}
              error={errors.title}
            />
            <Input
              label="Amount"
              type="number"
              placeholder="₹0"
              shape="rounded"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              error={errors.amount}
              required
            />
            <div>
              <label htmlFor="">Category</label>
              <Select
                name="category"
                value={values.category.value}
                onChange={handleChange}
                required
              >
                {categoryOptions.map((category) => (
                  <Option key={category.value} value={category.value}>
                    {category.label}
                  </Option>
                ))}
              </Select>
            </div>
            <Button
              variant="primary"
              type="submit"
              shape="rounded"
              disabled={errors.title || errors.amount || isSubmitting}
            >
              {isSubmitting ? "Saving... " : "Save Expense"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddExpense;
