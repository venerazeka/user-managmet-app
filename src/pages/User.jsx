import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>User not found.</p>;

  const { name, email, phone, website, address } = user;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Details</h2>

      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>

      {address && (
        <div>
          <p><strong>Address:</strong></p>
          <ul style={{ marginLeft: '20px' }}>
            <li><strong>Street:</strong> {address.street}</li>
            <li><strong>City:</strong> {address.city}</li>
            <li><strong>Zip:</strong> {address.zipcode}</li>
          </ul>
        </div>
      )}

      <Link to="/" style={{ display: 'inline-block', marginTop: '20px' }}>
        ← Back to user list
      </Link>
    </div>
  );
};

export default UserDetails;
