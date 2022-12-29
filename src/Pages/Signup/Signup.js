import { Button, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Authprovider';

const Signup = () => {

    const {
        handleSubmit,
        register,
        reset
      } = useForm();
      const [signUpError, setSignUpError] = useState("");
      const { createUser, googleLogin, loading } =
        useContext(AuthContext);
    
      const handleRegister = (data) => {
        setSignUpError("");
        createUser(data.email, data.password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            toast("User created successfully");
            reset();
          })
          .catch((error) => setSignUpError(error.message));
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



    return (
        <section className="w-1/3 mx-auto my-32 shadow-lg p-10">
      <h1 className="text-center mb-5 font-bold text-2xl">Login</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            {...register("name")}
            id="name"
            type="text"
            placeholder="Name"
            required={true}
            shadow={true}
          />
        </div>
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
        {signUpError && <p className="text-red-500">{signUpError}</p>}
        <Button type="submit">Login</Button>
      </form>
      <p className="text-center my-5">or,</p>
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

export default Signup;