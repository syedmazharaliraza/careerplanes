"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome</h1>
        <p className="text-gray-600 mb-8">Sign in to access your account</p>
        {error === "AccessDenied" && (
          <p className="text-red-500 mb-4">
            You are not allowed to access this application.
          </p>
        )}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
        >
          <Image
            src="/google-icon.svg"
            alt="Google logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
