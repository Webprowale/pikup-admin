"use client"
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type OrderItem = {
  product: Product;
  quantity: number;
  price: number;
  _id: string;
};

type Order = {
  _id: string;
  user: string;
  vendor: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  orderId: string;
  deliveryTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get("auth_token");
        const response = await fetch(`${API_URL}/order`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data: { orders: Order[] } = await response.json(); 
        console.log("API Response:", data);
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Table className="shadow-md p-5 border">
      <TableCaption>List of Orders</TableCaption>
      <TableHeader className="bg-[#FE7622] border">
        <TableRow>
          <TableHead className="font-bold text-white">#</TableHead>
          <TableHead className="font-bold text-white">Order ID</TableHead>
          <TableHead className="font-bold text-white">User</TableHead>
          <TableHead className="font-bold text-white">Vendor</TableHead>
          <TableHead className="font-bold text-white">Total Amount</TableHead>
          <TableHead className="font-bold text-white">Status</TableHead>
          <TableHead className="font-bold text-white">Delivery Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {orders.map((order, index) => (
          <TableRow key={order._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.user}</TableCell>
            <TableCell>{order.vendor}</TableCell>
            <TableCell>₦{order.totalAmount.toLocaleString()}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{new Date(order.deliveryTime).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
