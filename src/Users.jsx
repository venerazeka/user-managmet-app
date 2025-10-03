import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Gabim gjatë marrjes së të dhënave:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage('Emri dhe emaili janë të detyrueshëm!');
      return;
    }

    if (editingId !== null) {
     
      const updatedUsers = users.map(user =>
        user.id === editingId ? { ...user, name: formData.name, email: formData.email } : user
      );
      setUsers(updatedUsers);
      setMessage('Përdoruesi u përditësua me sukses.');
      setEditingId(null);
    } else {
     
      const newUser = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        company: { name: 'Local User' }
      };
      setUsers([newUser, ...users]);
      setMessage('Përdoruesi u shtua me sukses.');
    }
    setFormData({ name: '', email: '' });
  };

  const handleDelete = (id) => {
    const filtered = users.filter(user => user.id !== id);
    setUsers(filtered);
    setMessage('Përdoruesi u fshi me sukses.');
   
    if (editingId === id) {
      setEditingId(null);
      setFormData({ name: '', email: '' });
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setFormData({ name: userToEdit.name, email: userToEdit.email });
      setEditingId(id);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      <div className="container mt-5">
        <h2 className="mb-4">Menaxhimi i Përdoruesve</h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Emri"
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
          <button type="submit" className="btn btn-primary">
            {editingId !== null ? 'Update' : 'Add'}
          </button>
        </form>

        {message && <div className="alert alert-info">{message}</div>}

        <input
          type="text"
          placeholder="Search by name or email"
          className="form-control mb-3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Emri</th>
              <th>Email</th>
              <th>Kompania</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
               <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
  {user.name}
</Link>

                </td>
                <td>{user.email}</td>
                <td>{user.company?.name}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
