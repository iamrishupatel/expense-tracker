import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./features/appSlice";
import authReducer from "./features/authSlice";
import expReducer from "./features/expenseSlice";
import budgetReducer from "./features/budgetSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    expense: expReducer,
    budget: budgetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
