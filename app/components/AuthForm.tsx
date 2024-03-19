"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const onSubmit = (data: {
    username?: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/conversations");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="sm:w-full sm:max-w-md">
      <div
        className="
         bg-gray-100
          px-4
          py-8
          border-l-2
          sm:px-10
        "
      >
        <div className="space-y-3">
          {variant === "REGISTER" && (
            <>
              <p>Username</p>
              <input
                type="text"
                required={true}
                disabled={isLoading}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
                className=" bg-transparent p-1 rounded-md border-2"
              />
            </>
          )}
          <>
            <p>Email</p>
            <input
              type="email"
              placeholder="Email"
              required={true}
              disabled={isLoading}
              className=" bg-transparent p-1 rounded-md border-2"
              onChange={(event) => setEmail(event.target.value)}
            />
            <p>Password</p>
            <input
              type="password"
              required={true}
              placeholder="Password"
              disabled={isLoading}
              className=" bg-transparent p-1 rounded-md border-2"
              onChange={(event) => setPassword(event.target.value)}
            />
          </>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              onClick={() => onSubmit({ username, email, password })}
              className=" border-2 rounded-md p-2 bg-white"
            >
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-100 z-1 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
            flex
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 flex-col items-center text-gray-500
          "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
