import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
       
        const usersData = res.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'user',
        }));
        setUsers(usersData);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage('Name and Email are required');
      return;
    }

    const newUser = {
      id: Date.now(), //
      name: formData.name,
      email: formData.email,
      role: formData.role || 'user',
    };

    setUsers([newUser, ...users]);
    setFormData({ name: '', email: '', role: '' });
    setMessage('User added locally!');
  };

  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      setMessage('User deleted locally');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Management</h1>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <select
          className="form-control mb-2"
          value={formData.role}
          onChange={e => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Add User
        </button>
      </form>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
