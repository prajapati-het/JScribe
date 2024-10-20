import React from "react";
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
import {  useSignupMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { useDispatch } from "react-redux";

import {   signInWithPopup } from 'firebase/auth';
import {  auth, googleProvider } from '@/utils/firebase';

import { FcGoogle } from "react-icons/fc";



const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default function Signup() {

  const [signup, {isLoading}] = useSignupMutation();
  //const [googleSignIn] = useGoogleSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      const response = await signup(values).unwrap();
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
  
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();
  
      const requestBody = {
        username: firebaseUser.displayName || "Default Username",
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        picture: firebaseUser.photoURL,
      };
  
      const response = await fetch("http://localhost:4000/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log(response.json());
  
      const userData = await response.json();

      const values = {
        username: userData.username as string,
        email: userData.email as string,
        password: userData.password as string
      }
      

      const user_response = await signup(values).unwrap();
  
      dispatch(updateCurrentUser(user_response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
  
      console.log("User Data:", userData);
    } catch (error) {
      console.error("Error during sign-in:", error);
      handleError(error);
    }
  };
  

  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col ">
      <div className="__form_controller bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px] ">
        <div className="">
          <h1 className=" font-mono text-4xl font-bold text-left">Signup</h1>
          <p className="font-mono text-xs">
            Join the community of expert frontend developers 👨‍💻.{" "}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignup)} className="">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} type="email" placeholder="Email" {...field} />
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
                    <Input disabled={isLoading} type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" loading={isLoading} >
              Signup
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
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>.
        </small>
        
      </div>
    </div>
  );
}
