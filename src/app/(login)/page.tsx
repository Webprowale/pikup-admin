"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import { Loader2 } from "lucide-react"; // Spinner Icon

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [meg, setMeg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMeg(""); // Clear previous messages

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

      document.cookie = `auth_token=${data.token}; path=/; Secure; SameSite=Strict`;
      setMeg("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      setMeg("Invalid Credential");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96 shadow-lg">
        <CardHeader className="flex flex-col justify-center items-center">
          <Image src="/Frame 2.svg" height={100} width={100} alt="pikup logo" priority />
          <h5 className="my-8">Admin Login</h5>
        </CardHeader>
        <p className="text-red-500 text-center">{meg}</p>
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

            <Button type="submit" className="w-full mt-4 bg-[#FE7622]" disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
