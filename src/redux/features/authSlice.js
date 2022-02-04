/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { SET_EXPENSES } from "./expenseSlice";

const initialState = null;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, { payload }) => (state = payload),
    LOGOUT: (state) => (state = null),
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export default authSlice.reducer;

// THUNK

export const logInWithGoogle = () => async (dispatch, state) => {
  // const toastId = toast.loading("Signing in...");
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithPopup(auth, provider);
    const userData = {
      displayName: res.user.displayName,
      email: res.user.email,
      photoURL: res.user.photoURL,
      id: res.user.uid,
      budget: 0,
    };
    await addUserRecordToDb(userData);
    localStorage.setItem("xpense-user", JSON.stringify(userData));
    return dispatch(LOGIN(userData));
  } catch (e) {
    console.log(e);
  }
};
export const logout = () => async (dispatch, state) => {
  const auth = getAuth();
  auth.signOut();
  localStorage.setItem("xpense-user", null);
  dispatch(LOGOUT());
  dispatch(SET_EXPENSES([]));
};

const addUserRecordToDb = async (user) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "users", user.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    // doc.data() will be undefined in this case
    return await setDoc(doc(db, "users", user.id), user, { merge: true });
  } catch (error) {
    throw new Error(error);
  }
};
