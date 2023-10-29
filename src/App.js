
import './App.css';
import React, { useState } from 'react';
import Login from './Components/login';
import CustomerList from './Components/customerList';
import AddCustomer from './Components/addcustomer';
function App() {
  const [bearerToken, setBearerToken] = useState('');
  return (
    <div className="App">
      <h1>Customer Management App</h1>
      {/* Render the Login component */}
      <Login setBearerToken={setBearerToken} />

      {/* Render the CustomerList component with the Bearer token */}
      {bearerToken && <CustomerList bearerToken={bearerToken} />}

      {/* Render the AddCustomer component with the Bearer token */}
      {bearerToken && <AddCustomer bearerToken={bearerToken} />}
    </div>
  );
}

export default App;
