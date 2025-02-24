"use client"
import React, { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        const response = await fetch(`${API_URL}/admin/all-users`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
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
          <TableHead className="font-bold text-2rem text-white">Joined</TableHead>
          <TableHead className="font-bold text-2rem text-white w-[150px]">Balance</TableHead>
          <TableHead className="font-bold text-2rem text-white w-[100px]">No of Purchase</TableHead>
          <TableHead className="font-bold text-2rem text-white w-[90px]">Deactivate Acc</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{user._id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{user.wallet.accountBalance}</TableCell>
            <TableCell>{user.wallet.transactions.length}</TableCell>
            <TableCell>{user.user_active ? "Active" : "Inactive"}</TableCell>
          </TableRow>
        ))}
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
