"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/lib/config";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting the form");

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data?.message);
      }
      document.cookie = `auth_token=${data.token}; path=/;  Secure; SameSite=Strict`;
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Invalid Credential");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-96 shadow-lg">
          <CardHeader className="flex justify-center items-center">
            <Image
              src="/Frame 2.svg"
              height={100}
              width={100}
              alt="pikup logo"
              priority
            />
            <h5 className="my-8">Admin Login</h5>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="mt-12">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                className="mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
             
              <Button type="submit" className="w-full mt-4 bg-[#FE7622]">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
