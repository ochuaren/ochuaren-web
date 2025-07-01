"use client";

import { Button } from "@/components/button";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const handleSignout = async () => {
    setIsProcessing(true);
    const res = await signOut();
    setIsProcessing(false);
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Button>退出</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
