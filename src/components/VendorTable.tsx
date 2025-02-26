"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import Cookies from "js-cookie";
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

// Define TypeScript type for vendor data
type Vendor = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  user_verified: boolean;
  user_active: boolean;
  avatar: string;
  createdAt: string;
  wallet: {
    accountBalance: number;
  };
};

export function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await fetch(`${API_URL}/admin/all-vendors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data: { message: string; data: Vendor[] } = await response.json();
        setVendors(data.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <Table className="shadow-md p-5 border">
      <TableCaption>A list of vendors on the app</TableCaption>
      <TableHeader className="bg-[#FE7622] border">
        <TableRow>
          <TableHead className="font-bold text-white">#</TableHead>
          <TableHead className="font-bold text-white">ID</TableHead>
          <TableHead className="font-bold text-white">Name</TableHead>
          <TableHead className="font-bold text-white">Email</TableHead>
          <TableHead className="font-bold text-white">Phone</TableHead>
          <TableHead className="font-bold text-white">Joined</TableHead>
          <TableHead className="font-bold text-white">Balance</TableHead>
          <TableHead className="font-bold text-white">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : vendors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No vendors found.
            </TableCell>
          </TableRow>
        ) : (
          vendors.map((vendor, index) => (
            <TableRow key={vendor._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{vendor._id}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.phone}</TableCell>
              <TableCell>{new Date(vendor.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>₦{vendor.wallet.accountBalance.toLocaleString()}</TableCell>
              <TableCell>
                {vendor.user_active ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
