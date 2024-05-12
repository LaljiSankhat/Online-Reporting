import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from '../App';
import Home from '../Pages/Home';
import PostIssue from '../Pages/PostIssue';
import FeedbackForm from '../Pages/FeedbackForm';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import ForgotPassword from '../Pages/ForgotPassword';
import Profile from '../Pages/Profile';
import MyCompaints from '../Sidebars/MyCompaints';
import AllIssues from '../Admin/AllIssues';
import AllFeedbacks from '../Admin/AllFeedbacks';
import ViewFeedback from '../Admin/ViewFeedback';



const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {path: "/", element:<Home/>},
        {path: "/post-issue", element:<PostIssue/>},
        {path: "/feedback", element: <FeedbackForm/>},        
        {path: "/all-issues", element: <AllIssues />},        
        {path: "/all-feedbacks", element: <AllFeedbacks />},        
        {path: "/all-feedbacks/:id", element: <ViewFeedback />},        
      ],
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/sign-up",
      element: <SignUp />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/profile", 
      element: <Profile/>
    },
    {
      path: "/my-complaints", 
      element: <MyCompaints/>
    },
  ]);

export default router