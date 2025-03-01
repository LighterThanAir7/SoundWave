import { useState, useEffect } from 'react';
import api from '../config/axiosConfig.js';
import AdminSidebar from "./AdminSidebar.jsx";
import TableCheckbox from "./common/TableCheckbox.jsx";
import Helper from "../helpers/Helper.jsx";
import ContextMenu from "./ContextMenu.jsx";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getContextMenuOptions = (userId) => [
    { label: 'Edit', link: `/admin/users/${userId}` },
    { label: 'Delete', link: `/admin/users/${userId}` },
    { label: 'View Details', link: `/admin/users/${userId}` }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users');
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

  const handleSelectAll = (checked) => {
    if (checked) {
      // Ako je označen, dodaj sve user ID-eve u selectedUsers
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  }

  const handleSelectRow = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="admin-wrapper">
        <h1 className="admin-title">
          Users Management
        </h1>

        {/*<div>
          <input type="text" placeholder="Seach users by name or email..."/>
        </div>*/}

        <div id="table-users" className="table">
          <div className="table__header">
            <div className="table__row">
              <div className="table__data">
                <TableCheckbox
                  value={selectedUsers.length === users.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </div>
              <div className="table__data">ID</div>
              <div className="table__data">Type</div>
              <div className="table__data">Status</div>
              <div className="table__data">Email</div>
              <div className="table__data">Username</div>
              <div className="table__data">Created on</div>
              <div className="table__data"><i className="icon-dots"></i></div>
            </div>
          </div>
          <div className="table__body">
            {users.map((user) => (
              <div className="table__row" key={user.id}>
                <div className="table__data">
                  <TableCheckbox
                    id={user.id}
                    value={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectRow(user.id)}
                  />
                </div>
                <div className="table__data">{user.id}</div>
                <div className="table__data">{user.user_type}</div>
                <div className="table__data">
                  <span>
                    {user.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="table__data">{user.email}</div>
                <div className="table__data">{user.username}</div>
                <div className="table__data">{Helper.formatAdminTableDate(user.created_on)}</div>
                <div className="table__data">
                  <ContextMenu options={getContextMenuOptions(user.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination">
          <div>Rows per page:
            <select name="" id=""></select>
            <span>768 items</span>
          </div>
        </div>
      </div>
    </div>
  );
}