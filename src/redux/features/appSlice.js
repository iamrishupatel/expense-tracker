import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateExpDrawerVisible: false,
  isCreateExpModalVisible: false,
  isAddBudgetVisible: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SET_CREATE_EXP_DRAWER: (state, { payload }) => {
      state.isCreateExpDrawerVisible = payload;
    },
    SET_CREATE_EXP_MODAL: (state, { payload }) => {
      state.isCreateExpModalVisible = payload;
    },
    SET_BUDGET_MODAL: (state, { payload }) => {
      state.isAddBudgetVisible = payload;
    },
  },
});

export const { SET_CREATE_EXP_DRAWER, SET_CREATE_EXP_MODAL, SET_BUDGET_MODAL } =
  appSlice.actions;
export default appSlice.reducer;
