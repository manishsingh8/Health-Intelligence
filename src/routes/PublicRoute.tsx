import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

export const PublicRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};
