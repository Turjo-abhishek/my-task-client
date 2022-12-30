import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Authprovider";

const Login = () => {
  const { Login, googleLogin, loading } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoginError("");
    Login(data.email, data.password)
      .then((result) => {
        toast.success("Logged in successfully");
        reset();
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success("Logged in successfully with Google");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mb-10">
        <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="w-1/3 mx-auto my-32 shadow-lg p-10">
      <h1 className="text-center mb-5 font-bold text-2xl">Login</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            {...register("email")}
            id="email2"
            type="email"
            placeholder="name@company.com"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput
            {...register("password")}
            id="password2"
            type="password"
            required={true}
            shadow={true}
          />
        </div>
        {loginError && <p className="text-red-500">{loginError}</p>}
        <Button type="submit">Login</Button>
      </form>
      <div class="inline-flex justify-center items-center w-full">
        <hr class="my-8 w-56 h-px bg-gray-700 border-0 dark:bg-gray-700" />
        <span class="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">
          or
        </span>
      </div>
      <Button className="w-full" onClick={handleGoogleLogin}>
        <FaGoogle className="mr-2"></FaGoogle>
        Sign in With Google
      </Button>
      <p className="text-center mt-3">
        New to this Website?{" "}
        <Link className="text-orange-600 font-bold" to="/signup">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;
