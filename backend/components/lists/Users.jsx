import { useState, useEffect } from 'react';
import api from '../../config/axiosConfig.js';
import AdminSidebar from "../AdminSidebar.jsx";
import TableCheckbox from "../common/TableCheckbox.jsx";
import Helper from "../../helpers/Helper.jsx";
import ContextMenu from "../common/ContextMenu.jsx";
import Pagination from "../common/Pagination.jsx";
import AdminLoader from "../common/AdminLoader.jsx";
import AdminError from "../common/AdminError.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getContextMenuOptions = (userId) => [
    { label: 'Edit', link: `/admin/users/${userId}` },
    { label: 'Delete', link: `/admin/users/${userId}` },
  ];

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
        <AdminLoader loading={loading} />
        <AdminError error={error} visible={!loading && error} setVisible={() => setError(null)} />
        <h1 className="admin-title">Users Management</h1>
        {!loading && !error && (
          <>
            {users.length > 0 ? (
              <>
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
                <Pagination itemCount={users.length} loading={loading} />
              </>
            ) : (
              <div className="no-data">No users found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}