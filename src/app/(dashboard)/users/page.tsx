import React from 'react';
import {UserTable} from '../../../components/UserTable';

export default function UsersPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <UserTable />
    </div>
  );
}
