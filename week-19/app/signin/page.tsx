"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data)
    const { username, password } = data
    const backendData = await axios.post("http://localhost:3000/api/v1/signup", { username, password })

  };

  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center">
      <div className="p-2 flex flex-col justify-center items-center gap-4">
        <input
          className="outline-2 outline-blue-600 rounded-full py-2 px-3"
          type="text"
          placeholder="username"
          {...register("username", {
            required: "username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        {errors.username && (
          <p className="text-sm text-red-600">{errors.username.message as string}</p>
        )}

        <input
          className="outline-2 outline-blue-600 rounded-full py-2 px-3"
          type="password"
          placeholder="password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
            maxLength: {
              value: 8,
              message: "Password must not exceed 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message as string}</p>
        )}
      </div>


      <button
        className="rounded-full bg-amber-400 px-9 hover:cursor-pointer hover:text-white transition-all delay-200 ease-in py-2 font-semibold mt-4"
        onClick={handleSubmit(onSubmit)}
      >
        Signin
      </button>
    </div>
  );
}
