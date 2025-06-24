import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{ width: '200px', background: '#f8f9fa', padding: '20px', height: '100vh' }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/create-flock">Create Flock</Link></li>
        <li><Link to="/daily-report">Daily Entry Report</Link></li>
        <li><Link to="/reports">Reports</Link></li>

        
      </ul>
    </div>
  );
}

export default Sidebar;
