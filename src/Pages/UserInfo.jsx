import React, { useEffect, useState, useContext } from 'react';
import productContext from '../context/products/productContext';

function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const context = useContext(productContext);  
  const { host  } = context; //destructuring

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the auth token from localStorage
        const authToken = localStorage.getItem('token');

        // Check if the auth token exists
        if (!authToken) {
          setError('No auth token found');
          setLoading(false);
          return;
        }

        // Make a POST request to the backend to fetch user details
        const response = await fetch(`${host}/api/v1/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        // Parse the response data
        const data = await response.json();

        // Set the user data
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>User Info</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
}

export default UserInfo;
