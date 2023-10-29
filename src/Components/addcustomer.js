import React, { useState } from 'react';

function AddCustomer({ bearerToken }) {
  const [customerData, setCustomerData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleAddCustomer = () => {
    // Send a POST request to create a new customer
    fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error('Bad request: First Name or Last Name is missing.');
        } else {
          throw new Error('Failed to create a new customer.');
        }
      })
      .then((data) => {
        setResponseMessage('Successfully Created');
        // Optionally, you can reset the form here
        setCustomerData({
          first_name: '',
          last_name: '',
          street: '',
          address: '',
          city: '',
          state: '',
          email: '',
          phone: '',
        });
      })
      .catch((error) => {
        setResponseMessage(error.message);
      });
  };

  return (
    <div>
      <h2>Add New Customer</h2>
      <form>
        <label>
          First Name:
          <input
            type="text"
            value={customerData.first_name}
            onChange={(e) => setCustomerData({ ...customerData, first_name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={customerData.last_name}
            onChange={(e) => setCustomerData({ ...customerData, last_name: e.target.value })}
            required
          />
        </label>
        <br />
        {/* Add more input fields for the other customer data here */}
        <button type="button" onClick={handleAddCustomer}>
          Add Customer
        </button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
}

export default AddCustomer;
