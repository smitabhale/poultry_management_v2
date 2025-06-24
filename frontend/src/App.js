import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateFlock from './pages/CreateFlock';
import Reports from './pages/Reports';
import Sidebar from './components/Sidebar';
import DailyEntryReport from './pages/DailyEntryReport';
import { useLocation } from "react-router-dom";


function App() {
  const location = useLocation();
  return (
    // <Router>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <div className="col-2 col-md-2 col-xl-2 px-sm-2 px-0 bg-light min-vh-100">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="col py-3">
            <Routes>
              <Route path="/" element={<Dashboard key={location.pathname}/>} />
              <Route path="/create-flock" element={<CreateFlock />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/daily-report" element={<DailyEntryReport />} />
            </Routes>
          </div>
        </div>
      </div>
    // </Router>
  );
}

export default App;
