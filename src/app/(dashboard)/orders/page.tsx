import React from 'react';
import {OrderTable} from '../../../components/OrderTable';

export default function UsersPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <OrderTable />
    </div>
  );
}
