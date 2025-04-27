import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import HomePage from "./pages/HomePage";
import "./App.css";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PostIssuePage from "./pages/PostIssuePage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";
import MyReportsPage from "./pages/MyReportsPage";
import AllIssuesPage from "./pages/Admin/AllIssuesPage";
import AllFeedbacks from "./pages/Admin/AllFeedbacks";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Toaster />
      <Navbar />

      {isCheckingAuth ? (
        <p>Loading...</p> // or a loader
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/post-issue"
            element={authUser ? <PostIssuePage /> : <Navigate to="/" />}
          />
          <Route
            path="/post-feedback"
            element={authUser ? <FeedbackPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route
            path="/my-reports"
            element={authUser ? <MyReportsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/all-issues"
            element={authUser ? <AllIssuesPage /> : <Navigate to="/" />}
          />
          <Route
            path="/all-feedbacks"
            element={authUser ? <AllFeedbacks /> : <Navigate to="/" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
