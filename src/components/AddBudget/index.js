import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "artemis-ui";
import { Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { createBudget } from "../../redux/features/budgetSlice";

// styles
import s from "./Addbudget.module.css";

const AddBudget = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { monthlyBudget } = useSelector((state) => state.budget);

  const initialValues = {
    budget: monthlyBudget,
  };

  const validationSchema = yup.object({
    budget: yup
      .string()
      .required("Title is required")
      .max(6, "Must be 6 characters or less"),
  });

  const handleSubmit = (values, actions) => {
    const toastId = toast.loading("Adding...");

    dispatch(createBudget(id, values.budget)).then(() => {
      toast.success("Budget added....", {
        id: toastId,
      });
      actions.setSubmitting(false);
      actions.resetForm({ budget: 0 });
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
              label="Amount"
              type="number"
              name="budget"
              placeholder="₹0"
              shape="rounded"
              value={values.budget}
              onChange={handleChange}
              error={errors.budget}
            />
            <Button
              variant="primary-light"
              type="submit"
              shape="rounded"
              disabled={errors.budget || isSubmitting}
            >
              {isSubmitting ? "Saving... " : "Create Budget"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddBudget;
