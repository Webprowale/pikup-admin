import React from 'react';
import {RiderTable} from '../../../components/RiderTable';

export default function UsersPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Riders List</h1>
      <RiderTable />
    </div>
  );
}
