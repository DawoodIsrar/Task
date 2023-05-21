import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { signUpSchema } from "../../schemas/signUpSchema";

function Registration() {
  const [verify, setVerify] = useState([]);
  const navigate = useNavigate();


  const initialValues = {
    username: "",
    email: "",
    position: "",
    password: "",
    retypePassword: "",
  };
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: () => {
        register(values);
      },
    });
  const register = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/signUp",
        values
      );
      if(response.status===201){
        navigate("/")
      }
      else{
        navigate("/register")
      }
    } catch (error) {
      if(error.response.status==500){
        alert(error.response.data.message)
      }
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">Registration Form</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="User Name"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      />
                      <label
                        htmlFor="username"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs"
                      >
                        User Name
                      </label>
                      {errors.username && touched.username ? (
                        <p className="text-red-500 text-xs text-left pt-3">
                          {errors.username}
                        </p>
                      ) : null}
                    </div>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs"
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
                        id="position"
                        name="position"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Position"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.position}
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs"
                      >
                      Position
                      </label>
                      {errors.position && touched.position ? (
                        <p className="text-red-500 text-xs text-left pt-3">
                          {errors.position}
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
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs"
                      >
                        Password
                      </label>
                      {errors.password && touched.password ? (
                        <p className="text-red-500 text-xs text-left pt-3">
                          {errors.password}
                        </p>
                      ) : null}
                    </div>
                    <div className="relative">
                      <input
                        id="retypePassword"
                        name="retypePassword"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.retypePassword}
                      />
                      <label
                        htmlFor="retypePassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs"
                      >
                        Retype Password
                      </label>
                      {errors.retypePassword && touched.retypePassword ? (
                        <p className="text-red-500 text-xs text-left pt-3">
                          {errors.retypePassword}
                        </p>
                      ) : null}
                    </div>

                    <div className="relative pt-4">
                      <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Sign Up
                      </button>
                    </div>
                    <div className="overflow-auto">{<p>{verify}</p>}</div>

                    <div className="relative pt-2">
                      <p className="text-sm">
                        Already Have Account{" "}
                        <Link to="/">
                          <span className="text-blue-400 pl-3 cursor-pointer underline">
                            Login
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Registration;
