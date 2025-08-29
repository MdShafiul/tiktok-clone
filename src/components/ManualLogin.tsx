import React from "react";
import Link from "next/link";
import { useFormik } from "formik";

const ManualLogin: React.FC = () => {
  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      // UI-only: replace with real auth logic
      console.log("Login submit", values);
      setTimeout(() => setSubmitting(false), 600);
    },
  });

  return (
    <div className="mb-6">
      <form
        onSubmit={formik.handleSubmit}
        className="border border-gray-700 bg-[#0f0f10] p-4 text-left rounded-md"
      >
        <label className="block text-sm font-semibold mb-2">Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-md bg-transparent border border-gray-600 p-2 text-sm text-white"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="mt-1 text-xs text-red-400">
            {formik.errors.email}
          </div>
        ) : null}

        <label className="block text-sm font-semibold mt-4 mb-2">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-md bg-transparent border border-gray-600 p-2 text-sm text-white"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="mt-1 text-xs text-red-400">
            {formik.errors.password}
          </div>
        ) : null}

        <div className="mt-3 flex items-center justify-between text-sm text-gray-300">
          <label className="flex items-center gap-2">
            <input
              name="remember"
              type="checkbox"
              checked={formik.values.remember}
              onChange={() =>
                formik.setFieldValue(
                  "remember",
                  !formik.values.remember
                )
              }
              className="h-4 w-4 rounded bg-gray-700"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-primary text-sm font-medium"
          >
            Forgot?
          </button>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {formik.isSubmitting ? "Logging in..." : "Log in"}
        </button>

        <div className="mt-3 text-center text-xs text-gray-400">
          Don’t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-primary font-medium cursor-pointer">
              Sign up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ManualLogin;
