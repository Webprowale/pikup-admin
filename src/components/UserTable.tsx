"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import Cookies from "js-cookie";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        
        if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          console.error("Unexpected API response format:", data);
          setUsers([]);
        }
      } catch (error:any) {
        console.error("Error fetching users:", error);
        setUsers([]); 
      }
    };
  
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId: string, currentStatus: boolean) => {
    try {
      const token = Cookies.get("auth_token");
      const url = currentStatus ? `${API_URL}/auth/suspend/${userId}` : `${API_URL}/auth/activate/${userId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_active: !currentStatus }),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, user_active: !currentStatus } : user
          )
        );
      } else {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  
  return (
    <Table className="shadow-md p-5 border">
      <TableCaption>A list of users on the App</TableCaption>
      <TableHeader className="bg-[#FE7622] border">
        <TableRow>
          <TableHead className="font-bold text-2rem text-white w-[30px]">#</TableHead>
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
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>₦{user.wallet?.accountBalance.toLocaleString() ?? "N/A"}</TableCell>
              <TableCell>{user.wallet?.transactions?.length ?? 0}</TableCell>
              <TableCell>{user.user_active ? "Active" : "Inactive"}</TableCell>
              <TableCell>{new Date(user?.createdAt || "").toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  className="bg-[#FE7622]"
                  onClick={() => handleStatusChange(user._id, user.user_active)}
                >
                  {user.user_active ? "DES" : "ACT"}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center">No users found</TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
