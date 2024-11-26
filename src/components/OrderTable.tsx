"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
  export  function OrderTable() {
    return (
    
      <Table className='shadow-md p-5 border'>
        <TableCaption>A list of user on App</TableCaption>
        <TableHeader className='bg-[#FE7622] border'>
          <TableRow>
          <TableHead  className="font-bold text-2rem text-white w-[80px]">ID</TableHead>
            <TableHead  className="font-bold text-2rem text-white">Name</TableHead>
            <TableHead  className="font-bold text-2rem text-white">Email</TableHead>
            <TableHead  className="font-bold text-2rem text-white">Joined</TableHead>
            <TableHead  className="font-bold text-2rem text-white w-[150px]">Balance</TableHead>
            <TableHead  className="font-bold text-2rem text-white w-[100px]">No of Purchase</TableHead>
            <TableHead  className="font-bold text-2rem text-white w-[90px]">Deactivate Acc</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody className='border'>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
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
    )
  }
  