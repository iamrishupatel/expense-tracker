import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Drawer } from "artemis-ui";
import { Navigate, Outlet } from "react-router-dom";

import AddExpense from "./AddExpense";
import BottomNav from "./BottomNav";
import Navigation from "./Nav";
import AddBudget from "./AddBudget";

import {
  SET_CREATE_EXP_DRAWER,
  SET_CREATE_EXP_MODAL,
  SET_BUDGET_MODAL,
} from "../redux/features/appSlice";

import { fetchExpenses } from "../redux/features/expenseSlice";
import { fetchBudget } from "../redux/features/budgetSlice";

const Layout = () => {
  const dispatch = useDispatch();

  const app = useSelector((state) => state.app);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      const res = dispatch(fetchBudget(auth.id));
      res.then((unsubscribe) => {
        if (!auth) unsubscribe();
      });
    }
  }, []);

  useEffect(() => {
    if (auth) {
      const res = dispatch(fetchExpenses(auth.id));
      res.then((unsubscribe) => {
        if (!auth) unsubscribe();
      });
    }
  }, []);

  if (!auth) return <Navigate to="/signin" />;

  return (
    <Fragment>
      <Navigation />
      <Outlet />
      <BottomNav />

      <Modal
        visible={app.isCreateExpModalVisible}
        onClose={() => dispatch(SET_CREATE_EXP_MODAL(false))}
        shape="rounded"
        title="Add Expense"
      >
        <AddExpense />
      </Modal>
      <Modal
        visible={app.isAddBudgetVisible}
        onClose={() => dispatch(SET_BUDGET_MODAL(false))}
        shape="rounded"
        title="Add Budget"
        placement="center"
      >
        <AddBudget />
      </Modal>
      <Drawer
        isVisible={app.isCreateExpDrawerVisible}
        onClose={() => dispatch(SET_CREATE_EXP_DRAWER(false))}
        placement="bottom"
        height="30rem"
        header={"Add Expense"}
      >
        <AddExpense />
      </Drawer>
    </Fragment>
  );
};

export default Layout;
