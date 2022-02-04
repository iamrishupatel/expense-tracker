import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Button } from "artemis-ui";
//
import Layout from "./components/Layout";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import SignIn from "./pages/signIn";
import SummaryPage from "./pages/summary";

import { LOGIN } from "./redux/features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("xpense-user"));
    if (userData) {
      dispatch(LOGIN(userData));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There&apos;s nothing here!</p>
              <Link to="/">
                <Button variant="primary" shape="rounded" size="sm">
                  Go Home
                </Button>
              </Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
