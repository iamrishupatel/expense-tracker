/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../lib/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

const initialState = {
  monthlyBudget: 0,
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    SET_BUDGET: (state, { payload }) => {
      state.monthlyBudget = payload;
    },
  },
});

export const { SET_BUDGET } = budgetSlice.actions;
export default budgetSlice.reducer;

// THUNK

export const fetchBudget = (userId) => async (dispatch, state) => {
  const userRef = doc(db, "users", userId);
  const unsub = onSnapshot(
    userRef,
    (doc) => {
      dispatch(SET_BUDGET(doc.data().budget));
    },
    (error) => {
      console.log(error);
    }
  );
  return unsub;
};

export const createBudget = (userId, budget) => async (dispatch) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      budget: Number(budget),
    });
  } catch (e) {
    throw new Error(e);
  }
};
