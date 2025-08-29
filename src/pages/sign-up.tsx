import Link from "next/link";
import React from "react";
import { useFormik, FormikHelpers } from "formik";
import Feedback from "../icons/Feedback";
import Logo from "../icons/Logo";
import Meta from "../components/Meta";

const SignUp: React.FC = () => {
  const validate = (values: { username: string; email: string; password: string; confirm: string }) => {
    type Errors = { username?: string; email?: string; password?: string; confirm?: string };
    const errors: Errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

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

    if (!values.confirm) {
      errors.confirm = "Please confirm your password";
    } else if (values.password !== values.confirm) {
      errors.confirm = "Passwords do not match";
    }

    return errors;
  };

  const formik = useFormik<{ username: string; email: string; password: string; confirm: string }>({
    initialValues: { username: "", email: "", password: "", confirm: "" },
    validate,
    onSubmit: (
      values: { username: string; email: string; password: string; confirm: string },
      { setSubmitting }: FormikHelpers<{ username: string; email: string; password: string; confirm: string }>
    ) => {
      console.log("Sign up values", values);
      setTimeout(() => setSubmitting(false), 600);
    },
  });

  return (
    <div className="h-screen text-white">
      <Meta
        title="Sign Up | ReelRush"
        description="Sign up page for ReelRush"
        image="https://res.cloudinary.com/alam313/image/upload/v1756429642/ReelRushLogo_j0oicz.png"
      />

      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <Logo />
        </Link>

        <button className="flex items-center text-sm font-medium text-white hover:underline">
          <Feedback />
          <span className="ml-2 inline-block">Feedback and help</span>
        </button>
      </div>

      <div className="mx-auto w-[420px] max-w-[calc(100%-32px)] pb-6">
        <div className="text-center">
          <h2 className="mt-6 mb-2 text-[28px] font-bold">Create your account</h2>
          <p className="mb-6 text-sm text-[rgba(255,255,255,0.75)]">
            Join ReelRush to post videos, follow creators, and explore trending
            content.
          </p>
        </div>

        <div className="rounded-lg border border-gray-700 bg-[#0f0f10] p-6">
          <form onSubmit={formik.handleSubmit}>
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              placeholder="yourname"
              className="w-full rounded-md bg-transparent border border-gray-600 p-2 text-sm text-white"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="mt-1 text-xs text-red-500">{formik.errors.username}</div>
            ) : null}

            <label className="block text-sm font-semibold mt-4 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md bg-transparent border border-gray-600 p-2 text-sm text-white"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="mt-1 text-xs text-red-500">{formik.errors.email}</div>
            ) : null}

            <label className="block text-sm font-semibold mt-4 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-md bg-transparent border border-gray-600 p-2 text-sm text-white"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="mt-1 text-xs text-red-500">{formik.errors.password}</div>
            ) : null}

            <label className="block text-sm font-semibold mt-4 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-md bg-transparent border border-gray-600 p-2 text-sm text-white"
              {...formik.getFieldProps("confirm")}
            />
            {formik.touched.confirm && formik.errors.confirm ? (
              <div className="mt-1 text-xs text-red-500">{formik.errors.confirm}</div>
            ) : null}

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white"
              disabled={formik.isSubmitting}
            >
              Sign up
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-300">
            By signing up, you agree to our{" "}
            <a className="text-primary font-medium">Terms</a> and{" "}
            <a className="text-primary font-medium">Privacy Policy</a>.
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="text-primary font-medium">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
