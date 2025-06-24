import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Reports() {
  const [selectedDate, setSelectedDate] = useState('');
  const [reportData, setReportData] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/reports-by-date/?date=${selectedDate}`);
      console.log(response.data)
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Daily Report by Date</h2>
      <div className="mb-3">
        <label>Select Date:</label>
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={fetchReports}>
          Fetch Report
        </button>
      </div>

      {reportData.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Batch Number</th>
              <th>Age</th>
              <th>Stage</th>
              <th>Shed</th>
              <th>Opening Female</th>
              <th>Female Mortality</th>
              <th>Closing Female</th>
              <th>Cum Female Mortality </th>
              <th>Cum Female Mortality%</th>
              <th>Opening Male</th>
              <th>Male Mortality</th>
              <th>Closing Male</th>
              <th>Cum Male Mortality </th>
              <th>Cum Male Mortality%</th>
              <th>Hatching Eggs</th>
              <th>Pullet</th>
              <th>Commercial Eggs</th>
              <th>Crack Eggs</th>
              <th>Waste Eggs</th>
              <th>Total Eggs</th>
              <th>Total Eggs%</th>
              <th>Hatching eggs%</th>
              <th>Opening female feed</th>
              <th>Female Feed Consumed</th>
              <th>Female stock Inn</th>
              <th>Closing Female Feed</th>
              <th>Opening Male feed</th>
              <th>Male Feed Consumed</th>
              <th>Male stock Inn</th>
              <th>Closing Male Feed</th>

              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {reportData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.batch_number}</td>
                <td>{entry.age}</td>
                <td>{entry.stage}</td>
                <td>{entry.shed}</td>
                <td>{entry.opening_female}</td>
                <td>{entry.female_mortality}</td>
                <td>{entry.closing_female}</td>
                <td>{entry.cumulative_female_mortality}</td>
                <td>{entry.cumulative_female_mortality_percentage}</td>
                <td>{entry.opening_male}</td>
                <td>{entry.male_mortality}</td>
                <td>{entry.closing_male}</td>
                <td>{entry.cumulative_male_mortality}</td>
                <td>{entry.cumulative_male_mortality_percentage}</td>
                <td>{entry.hatching_eggs}</td>
                <td>{entry.pullet_eggs}</td>
                <td>{entry.commercial_eggs}</td>
                <td>{entry.crack_eggs}</td>
                <td>{entry.waste_eggs}</td>
                <td>{entry.total_eggs}</td>
                <td>{entry.total_eggs_percentage}</td>
                <td>{entry.hatching_egg_percentage}</td>
                <td>{entry.opening_female_feed_stock}</td>
                <td>{entry.female_feed_consumption}</td>
                <td>{entry.female_stock_in}</td>
                <td>{entry.closing_female_feed}</td>
                <td>{entry.opening_male_feed_stock}</td>
                <td>{entry.male_feed_consumption}</td>
                <td>{entry.male_stock_in}</td>
                <td>{entry.closing_male_feed}</td>
               

               
               
                {/* Map remaining fields */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {reportData.length === 0 && selectedDate && (
        <p>No data found for the selected date.</p>
      )}
    </div>
  );
}

export default Reports;
