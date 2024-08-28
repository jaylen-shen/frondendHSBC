// src/pages/UserProfile.js
import React from 'react';
import DashboardCard from '../components/DashboardCard.js';
import DashboardContent  from '../components/DashboardContent.js'
// import TransactionTable from '../components/TransactionTable.js';
// import PortfolioDistribution from '../components/Charts/PortfolioDistribution.js'

const UserProfile = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <div>
        {/* DashboardCard now handles its own data fetching */}
        <DashboardCard title="Dashboard Card" /> 
        <DashboardContent title="Dashboard Content" /> 
        {/* <PortfolioDistribution title="Dashboard Content" />  */}
        {/* <TransactionTable title="Transaction History" /> */}
        
      </div>
    </div>
  );
};

export default UserProfile;
