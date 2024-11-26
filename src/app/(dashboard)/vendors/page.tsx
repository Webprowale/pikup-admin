import React from 'react';
import {VendorTable} from '../../../components/VendorTable';

export default function UsersPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Vendor List</h1>
      <VendorTable />
    </div>
  );
}
