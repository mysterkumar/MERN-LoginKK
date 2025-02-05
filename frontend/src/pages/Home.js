import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]); // Initialized as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  //error in this function fetchproduct as it is unable to take in the jwt token which is required to fetch the important 
  //property created by the user
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log("API response:", result);
      console.log("Type of result:", typeof result);
      
      if (Array.isArray(result)) {
        setProducts(result);
      } else if (result.products && Array.isArray(result.products)) {
        setProducts(result.products);
      } else {
        console.error("Unexpected format for products:", result);
        setProducts([]); // Fallback to an empty array
      }
    } catch (err) {
      handleError(err);
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <li>{item.name} : {item.price}</li>
            </ul>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
