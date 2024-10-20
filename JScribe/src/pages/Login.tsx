import React, { useEffect } from "react";
import "./pageStyles/grid.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";

import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });


  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const response = await login(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();

      const requestBody = {
        username: result.user.displayName || "Default Username",
        email: result.user.email,
        password: result.user.displayName || "defaultpassword",
        picture: result.user.photoURL,
      };
      console.log("Request Payload:", requestBody);

      const response = await fetch("http://localhost:4000/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      });

      const userData = await response.json();
      console.log("User Data:", userData);

      dispatch(updateCurrentUser(userData));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col ">
      <div className="__form_controller bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px] ">
        <div className="">
          <h1 className="font-mono text-4xl font-bold text-left">Login</h1>
          <p className="font-mono text-xs">Welcome back fello coder 😊. </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      disabled={isLoading}
                      placeholder="Username or Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      disabled={isLoading}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button loading={isLoading} className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-2 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSignIn}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>

        <small className="text-xs font-mono">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/signup">
            Signup
          </Link>.
        </small>
      </div>
    </div>
  );
}
