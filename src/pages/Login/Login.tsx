import RevPlus from "@/assets/icons/rp-logo.svg";
import { useLoginLogic } from "./Login.hook";
import Logo from "@/assets/icons/rp-logo-icon.svg";

const Login = () => {
  const { formik, loading } = useLoginLogic();
  const isFormValid =
    formik.isValid && !!formik.values.email && !!formik.values.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img src={RevPlus} alt="Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              autoComplete="new-email"
              placeholder="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#249563]"
              }`}
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-2">
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#249563]"
            />
          </div>

          <div className="flex justify-end mb-6">
            <button
              type="button"
              className="text-sm text-[#249563] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full py-2 rounded-lg font-medium transition ${
              loading
                ? "bg-[#249563] text-white cursor-not-allowed"
                : isFormValid
                  ? "bg-[#249563] text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-default"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                Signing you in…
                <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
