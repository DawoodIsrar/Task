import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginInSchema } from "../../schemas/loginSchema";
import axios from "axios";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginInSchema,
      onSubmit: () => {
        register(values);
      },
    });
  const register = async (values) => {
    //API call
    const response = await fetch("http://localhost:8000/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const json = await response.json();
    if (json.accessToken) {
      // Save the auth token and redirect
      sessionStorage.setItem("access-token", json.accessToken);
      sessionStorage.setItem("id", json.id);

      alert("login Successfully");
      setTimeout(() => {
        window.location.assign("/home");
      }, 1600);
    } else {
      alert("Not login");
    }
  };


  // const handleGoogleLogin = async () => {
  //   const response = await fetch("http://localhost:8000/auth/google", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
      // body: JSON.stringify(values),
    // });
    // const json = await response.json();
    // console.log(json);
    // if (json.accessToken) {
    //   // Save the auth token and redirect
    //   sessionStorage.setItem("access-token", json.accessToken);
    //   alert("login Successfully");
    //   setTimeout(() => {
    //     window.location.assign("/");
    //   }, 1600);
    // } else {
    //   alert("Not login");
    // }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login Form</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {errors.email && touched.email ? (
                      <p className="text-red-500 text-xs text-left pt-3">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {errors.password && touched.password ? (
                      <p className="text-red-500 text-xs text-left pt-3">
                        {errors.password}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative pt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                    >
                      Login
                    </button>
                  </div>
                  <div className="relative pt-2">
                    <p className=" text-sm">
                      Don't Have Account Have account{" "}
                      <Link to="/register">
                        <span className="text-blue-400 pl-3 cursor-pointer underline">
                          Sign Up
                        </span>
                      </Link>
                    </p>
                  </div>
                  <div className="relative pt-2">
                    <p className=" text-sm text-center">
                      <Link to="/forgetPassword">
                        <span className="text-blue-400 pl-3 cursor-pointer underline">
                          Forgot Password
                        </span>
                      </Link>
                    </p>
                  </div> 
                  <div className="flex flex-col justify-center mt-8">
                  <button className="px-3 py-3 mt-4 font-semibold text-gray-900 bg-white border-2 border-gray-400 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4 mr-3 text-gray-900 fill-current" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>Sign in with Google</button>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    
  );
}

export default Login;
