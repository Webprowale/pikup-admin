"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold">Login</h2>
        </CardHeader>
        <CardContent>
          <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" className="mt-2" onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full mt-4">Sign In</Button>
        </CardContent>
      </Card>
    </div>
  )
}
