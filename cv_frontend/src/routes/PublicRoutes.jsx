// routes/PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("cv_token");


  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}