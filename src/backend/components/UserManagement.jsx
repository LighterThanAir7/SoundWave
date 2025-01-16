import { useState, useEffect } from 'react';
import api from '../../backend/config/axiosConfig.js';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/admin/users');
        setUsers(response.data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white">
        <thead>
        <tr>
          <th className="px-6 py-3 border-b">ID</th>
          <th className="px-6 py-3 border-b">Type</th>
          <th className="px-6 py-3 border-b">Status</th>
          <th className="px-6 py-3 border-b">Email</th>
          <th className="px-6 py-3 border-b">Username</th>
          <th className="px-6 py-3 border-b">Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-6 py-4 border-b">{user.id}</td>
            <td className="px-6 py-4 border-b">{user.user_type}</td>
            <td className="px-6 py-4 border-b">
                <span className={`px-2 py-1 rounded ${user.status ? 'bg-green-200' : 'bg-red-200'}`}>
                  {user.status ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="px-6 py-4 border-b">{user.email}</td>
            <td className="px-6 py-4 border-b">{user.username}</td>
            <td className="px-6 py-4 border-b">
              <button className="text-gray-600 hover:text-gray-900">
                ⋮
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}