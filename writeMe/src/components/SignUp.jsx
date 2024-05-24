import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index";
import { set, useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    console.log(errors);
    setError("");
    try {
      console.log("data here ", data);
      const userData = await authService.createAccount(data);
      if (userData) {
        const currUser = authService.getCurrUser();
        if (currUser) {
          dispatch(login(currUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-white shadow-lg rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: {
                  value: true,
                },
                minLength: {
                  value: 3,
                  message: "Name should have more than 3 chars",
                },
                maxLength: {
                  value: 30,
                  message: "Name should have more than 30 chars",
                },
              })}
            />
            <p className={`text-red-600 rounded-md ${errors.name?.message ? 'bg-red-200 p-2' : ''} `}>
              {errors.name?.message} 
            </p>

            <Input
              label="Email: "
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address.",
                },
                unique : {
                  value : true,
                  message : "Email id already registered"
                }
              })}
            />
            {errors.email && (
              <p
                className={`text-red-600 rounded-md ${errors.email?.message ? 'bg-red-200 p-2' : ''} `}
                role="alert"
              >
                {errors.email?.message}
              </p>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: {
                  value : true
                },
                minLength: {
                  value : 8,
                  message : "Password min length 8"
                },
                maxLength: {
                  value:20,
                  message : "Password max length 20"
                },
              })}
            />
            <p
                className={`text-red-600 rounded-md ${errors.password?.message ? 'bg-red-200 p-2' : ''} `}
                role="alert"
              >
                {errors.password?.message}
              </p>
            <Button type="submit" className="w-full ">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
