
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const [totalClosingFemale, setTotalClosingFemale] = useState(0);
  const [totalClosingMale, setTotalClosingMale] = useState(0);
  const [totalsLoading, setTotalsLoading] = useState(true);
  const [totalsError, setTotalsError] = useState(null);

  const [latestEggPercentages, setLatestEggPercentages] = useState({});
  const [eggsLoading, setEggsLoading] = useState(true);
  const [eggsError, setEggsError] = useState(null);

  // Existing totals for female/male
  useEffect(() => {
    const fetchDailyEntriesAndCalculateTotals = async () => {
      try {
        setTotalsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/daily-entries/");
        const dailyEntries = response.data;

        // Group daily entries by batch_number
        const groupedByBatch = dailyEntries.reduce((groups, entry) => {
          if (!groups[entry.batch_number]) groups[entry.batch_number] = [];
          groups[entry.batch_number].push(entry);
          return groups;
        }, {});

        // Find the latest entry for each batch
        const latestEntries = Object.values(groupedByBatch).map(entries => {
          return entries.reduce((latest, current) =>
            new Date(current.date) > new Date(latest.date) ? current : latest
          );
        });

        // Sum closing female and male from the latest entries
        let totalFemale = 0;
        let totalMale = 0;
        latestEntries.forEach(entry => {
          totalFemale += Number(entry.closing_female) || 0;
          totalMale += Number(entry.closing_male) || 0;
        });

        setTotalClosingFemale(totalFemale);
        setTotalClosingMale(totalMale);
        setTotalsLoading(false);
      } catch (error) {
        setTotalsError("Failed to load daily entries");
        setTotalsLoading(false);
      }
    };

    fetchDailyEntriesAndCalculateTotals();
  },[] );

  // New useEffect: Latest egg percentage by shed
  useEffect(() => {
    const fetchLatestEggPercentagesByShed = async () => {
      try {
        setEggsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/daily-entries/");
        const dailyEntries = response.data;
        console.log(dailyEntries)

        // For each shed, keep latest entry by date
        const latestByShed = {};
        dailyEntries.forEach(entry => {
          const shed = entry.shed || "Unknown";
          if (shed==="1" || shed ===1) return;
          if (!latestByShed[shed] || new Date(entry.date) > new Date(latestByShed[shed].date)) {
            latestByShed[shed] = entry;
          }
        });

        // Extract total_eggs_percentage from latest entries
        const eggsPercentages = {};
        Object.entries(latestByShed).forEach(([shed, entry]) => {
          eggsPercentages[shed] = parseFloat(entry.total_eggs_percentage).toFixed(2);
        });

        setLatestEggPercentages(eggsPercentages);
        setEggsLoading(false);
      } catch (error) {
        setEggsError("Failed to load egg percentages");
        setEggsLoading(false);
      }
    };

    fetchLatestEggPercentagesByShed();
  }, [location]);

  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {totalsLoading ? (
          <div className="col-md-6 text-center">
            <h4>Loading totals...</h4>
          </div>
        ) : totalsError ? (
          <div className="col-md-6 text-center">
            <h4 className="text-danger">{totalsError}</h4>
          </div>
        ) : (
          <>
            <div className="col-md-5 mb-4">
              <div className="card text-center shadow-lg border-0">
                <div className="card-header bg-primary text-white fw-bold fs-5">
                  Total Closing Female
                </div>
                <div className="card-body bg-light">
                  <h2 className="display-4 fw-bold text-primary">
                    {totalClosingFemale.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-5 mb-4">
              <div className="card text-center shadow-lg border-0">
                <div className="card-header bg-success text-white fw-bold fs-5">
                  Total Closing Male
                </div>
                <div className="card-body bg-light">
                  <h2 className="display-4 fw-bold text-success">
                    {totalClosingMale.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Egg percentages by shed */}
      <div className="row justify-content-center">
        {eggsLoading ? (
          <div className="col-md-6 text-center">
            <h5>Loading egg percentages...</h5>
          </div>
        ) : eggsError ? (
          <div className="col-md-6 text-center text-danger">
            <h5>{eggsError}</h5>
          </div>
        ) : (
          Object.entries(latestEggPercentages).map(([shed, percentage]) => (
            <div className="col-md-4 mb-3" key={shed}>
              <div className="card shadow-lg border-0 text-center">
                <div className="card-header bg-warning fw-bold fs-6">{shed}</div>
                <div className="card-body bg-light">
                  <h3 className="fw-bold text-warning">{percentage}%</h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
