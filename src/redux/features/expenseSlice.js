/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  getFirestore,
  serverTimestamp,
  onSnapshot,
  collection,
  query,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  orderBy,
  getDoc,
  where,
  arrayUnion,
} from "firebase/firestore";
import categoryOptions from "../../categoryOptions";

import { db } from "../../lib/firebase";

const initialState = {
  totalExpense: 0,
  monthlyExpenses: [],
  monthlyExpByCategory: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    SET_EXPENSES: (state, { payload }) => {
      state.monthlyExpenses = payload;
    },
    SET_TOTAL_EXPENSES: (state, { payload }) => {
      state.totalExpense = payload;
    },
    SET_EXPENSES_BY_CAT: (state, { payload }) => {
      state.monthlyExpByCategory = categoryOptions
        .map((option) => ({ ...option, amount: 0 }))
        .map((bycat) => {
          payload.forEach((expense) => {
            if (expense.category === bycat.value) {
              bycat.amount += expense.amount;
            }
          });
          return bycat;
        });
    },
    SET_LOADING: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const {
  SET_EXPENSES,
  SET_LOADING,
  SET_TOTAL_EXPENSES,
  SET_EXPENSES_BY_CAT,
} = expenseSlice.actions;
export default expenseSlice.reducer;

export const fetchExpenses = (userId) => async (dispatch, state) => {
  const thisMonthBegining = new Date(
    new Date().getFullYear(),
    new Date().getMonth()
  );

  const userRef = doc(db, "users", userId);
  const q = query(
    collection(userRef, "expenses"),
    orderBy("createdAt", "desc"),
    where("createdAt", ">", thisMonthBegining)
  );

  const unsub = onSnapshot(
    q,
    (qSnap) => {
      const payload = [];
      qSnap.forEach((doc) => {
        payload.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        });
      });

      dispatch(SET_EXPENSES(payload));
      dispatch(SET_EXPENSES_BY_CAT(payload));

      dispatch(
        SET_TOTAL_EXPENSES(
          payload.reduce((prevTotal, currItem) => {
            return (prevTotal += currItem.amount);
          }, 0)
        )
      );
    },
    (error) => {
      console.log(error);
    }
  );
  return unsub;
};

export const createExpense = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    const expRef = collection(userRef, "expenses");

    let expData = {
      ...data,
      uid: userId,
      createdAt: serverTimestamp(),
    };

    // add expense to db
    const res = await addDoc(expRef, expData);

    return;
  } catch (e) {
    throw new Error(e);
  }
};

export const removeExpense = async (userId, docId) => {
  try {
    const userRef = doc(db, "users", userId);
    const expRef = doc(userRef, "expenses", docId);

    await deleteDoc(expRef);
  } catch (e) {
    throw new Error(e);
  }
};
