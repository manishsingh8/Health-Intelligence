import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { MainLayout } from "@/layout/MainLayout";
import LoginPage from "@/pages/Login/Login";
import RCMFlows from "@/pages/RCMFlows/RCMFlows";
import Payment from "@/pages/NonReconciledQueue/NonReconciledQueue";
import CashPostingPage from "@/pages/CashPosting Report/CashPostingPage";
import CashPostingQueue from "@/pages/CashPosting Queue/CashPostingQueue";
import ReconciledReport from "@/pages/ReconciledReport/ReconciledReport";
import Dashboard1 from "@/pages/RCMDashboard/RCMDashboard";
import Dashboard2 from "@/pages/HCDDashboard/HCDDashboard";
import RemittanceProcessing from "@/pages/Remittance Processing/RemittanceProcessing";
import EOBParser from "@/pages/EOB Parser/EOBParser";
import Adjustments from "@/pages/Adjustments/Adjustments";
import CDMDashboard from "@/pages/CDM/CDMDashboard";
import DocumentPage from "@/pages/CDM/documentsDetails/DocumentPage";
import BAIParser from "@/pages/BAIParser/BAIParser";

const RootRedirect = () => {
  const token = sessionStorage.getItem("authToken");
  return token ? (
    <Navigate to="/dashboard/rcm-dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/rcm-flows" element={<RCMFlows />} />
          <Route path="/variance-queue" element={<Payment />} />
          <Route path="/cash-posting" element={<CashPostingPage />} />
          <Route path="/cash-posting-queue" element={<CashPostingQueue />} />
          <Route path="/reconciled-report" element={<ReconciledReport />} />
          <Route path="/dashboard/rcm-dashboard" element={<Dashboard1 />} />
          <Route path="/dashboard/hcd-dashboard" element={<Dashboard2 />} />
          <Route path="/era-parser" element={<RemittanceProcessing />} />
          <Route path="/eob-parser" element={<EOBParser />} />
          <Route path="/bai-parser" element={<BAIParser />} />
          <Route path="/adjustments" element={<Adjustments />} />
          <Route path="/cdm" element={<CDMDashboard />} />
          <Route path="/cdm/letterDetails/:id" element={<DocumentPage />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
