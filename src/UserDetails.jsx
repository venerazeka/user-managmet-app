import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Gabim në marrjen e përdoruesit', error));
  }, [id]);

  if (!user) return <div>Loading user details...</div>;

  return (
    <div className="container mt-5">
      <h2>Detajet e Përdoruesit</h2>
      <p><strong>Emri:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telefoni:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Kompania:</strong> {user.company?.name}</p>
    </div>
  );
}

export default UserDetails;
