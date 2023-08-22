import React from 'react';
const Dashboard = ({ user }) => {
  return (
    <div className='ajajaj'>
      <h2>Welcome to Your Dashboard, {user.name}!</h2>
      <p>Email: {user.email}</p>
      {/* Display other user information if needed */}
    </div>
  );
};

export default Dashboard;
