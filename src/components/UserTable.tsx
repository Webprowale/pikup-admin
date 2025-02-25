"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import Cookies from "js-cookie";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "./ui/button";


interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  wallet: {
    accountBalance: number;
    transactions: any[];
  };
  user_active: boolean;
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await fetch(`${API_URL}/admin/all-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        console.log("API Response:", data); // Debugging log
  
        // Check if 'data.data' is an array and set it in state
        if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          console.error("Unexpected API response format:", data);
          setUsers([]); // Prevent errors by setting an empty array
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Ensure users is always an array
      }
    };
  
    fetchUsers();
  }, []);
  
  
  return (
    <Table className="shadow-md p-5 border">
      <TableCaption>A list of users on the App</TableCaption>
      <TableHeader className="bg-[#FE7622] border">
        <TableRow>
          <TableHead className="font-bold text-2rem text-white w-[80px]">ID</TableHead>
          <TableHead className="font-bold text-2rem text-white">Name</TableHead>
          <TableHead className="font-bold text-2rem text-white">Email</TableHead>
          <TableHead className="font-bold text-2rem text-white">Balance</TableHead>
          <TableHead className="font-bold text-2rem text-white w-[150px]">Transaction</TableHead>
          <TableHead className="font-bold text-2rem text-white w-[100px]">Active/In</TableHead>
          <TableHead className="font-bold text-2rem text-white w-[90px]">CreatedAt</TableHead>
          <TableHead className="font-bold text-2rem text-white w-[90px]">Deactivate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
            {users.length > 0 ? (
        users.map((user, index) => (
        <TableRow key={user._id}>
       <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.wallet?.accountBalance ?? "N/A"}</TableCell>
      <TableCell>{user.wallet?.transactions?.length ?? 0}</TableCell>
      <TableCell>{user.user_active ? "Active" : "Inactive"}</TableCell>
      <TableCell>{new Date(user?.createdAt || "").toLocaleDateString()}</TableCell>
     <TableCell><Button className="bg-[#FE7622]">DES</Button></TableCell>

    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={7} className="text-center">No users found</TableCell>
  </TableRow>
)}


      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
