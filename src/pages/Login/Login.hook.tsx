import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_ENDPOINTS } from "@/config/api";
import { useState } from "react";

export const useLoginLogic = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required(""),
      password: Yup.string().required(""),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      setApiError("");
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: values.email,
            password: values.password,
          }),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.message || "Login failed");
        }
        sessionStorage.setItem("authToken", result.data.token.access_token);
        sessionStorage.setItem("tokenType", result.data.tokenType);
        sessionStorage.setItem("username", result.data.username);
        sessionStorage.setItem("fullName", result.data.fullName);
        sessionStorage.setItem("userId", result.data.userId);
        navigate("/dashboard/rcm-dashboard", { replace: true });
      } catch (error: any) {
        setApiError(error.message || "Something went wrong");
        setLoading(false);
      }
    },
  });
  return {
    formik,
    loading,
    apiError,
  };
};
