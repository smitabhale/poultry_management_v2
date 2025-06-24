import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function DailyEntryReport() {
  const getInitialFormData = () => ({
    date: "",
    batchNumber: "",
    stage: "",
    shed: "",
    age: "",

    openingFemale: "",
    femaleMortality: "",
    closingFemale: "",
    cumulativeFemaleMortality: "",
    cumulativeFemaleMortalityPercentage: "",

    openingMale: "",
    maleMortality: "",
    closingMale: "",
    cumulativeMaleMortality: "",
    cumulativeMaleMortalityPercentage: "",

    hatchingEggs: "",
    pulletEggs: "",
    commercialEggs: "",
    crackEggs: "",
    wasteEggs: "",
    totalEggs: "",
    totalEggsPercentage: "",
    hatchingEggPercentage: "",

    openingFemaleFeedStock: "",
    femaleFeedConsumption: "",
    femaleStockInn: "",
    closingFemaleFeed: "",

    openingMaleFeedStock: "",
    maleFeedConsumption: "",
    maleStockInn: "",
    closingMaleFeed: "",
  });

  const [formData, setFormData] = useState(getInitialFormData());
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/flocks/");
        // const uniqueBatches = [...new Set(response.data.map(flock => flock.batch_number))];
        // setBatches(uniqueBatches);
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batch numbers:", error);
      }
    };

    fetchBatches();
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-calculations
  useEffect(() => {
    const opening = parseInt(formData.openingFemale) || 0;
    const mortality = parseInt(formData.femaleMortality) || 0;
    const closing = Math.max(0, opening - mortality);
    if (formData.closingFemale !== closing.toString()) {
      setFormData((prev) => ({ ...prev, closingFemale: closing.toString() }));
    }
  }, [formData.openingFemale, formData.femaleMortality]);

  useEffect(() => {
    const opening = parseInt(formData.openingMale) || 0;
    const mortality = parseInt(formData.maleMortality) || 0;
    const closing = Math.max(0, opening - mortality);
    if (formData.closingMale !== closing.toString()) {
      setFormData((prev) => ({ ...prev, closingMale: closing.toString() }));
    }
  }, [formData.openingMale, formData.maleMortality]);

  useEffect(() => {
    const openingFemale = parseInt(formData.openingFemale) || 0;
    const hatching = parseInt(formData.hatchingEggs) || 0;
    const pullet = parseInt(formData.pulletEggs) || 0;
    const commercial = parseInt(formData.commercialEggs) || 0;
    const crack = parseInt(formData.crackEggs) || 0;
    const waste = parseInt(formData.wasteEggs) || 0;

    const totalEggs = hatching + pullet + commercial + crack + waste;
    const totalEggsPercentage =
      openingFemale > 0
        ? ((totalEggs / openingFemale) * 100).toFixed(2)
        : "0.00";
    const hatchingEggPercentage =
      totalEggs > 0 ? ((hatching / totalEggs) * 100).toFixed(2) : "0.00";

    setFormData((prev) => {
      const updates = {};
      if (prev.totalEggs !== totalEggs.toString())
        updates.totalEggs = totalEggs.toString();
      if (prev.totalEggsPercentage !== totalEggsPercentage.toString())
        updates.totalEggsPercentage = totalEggsPercentage.toString();
      if (prev.hatchingEggPercentage !== hatchingEggPercentage.toString())
        updates.hatchingEggPercentage = hatchingEggPercentage.toString();
      return Object.keys(updates).length ? { ...prev, ...updates } : prev;
    });
  }, [
    formData.hatchingEggs,
    formData.pulletEggs,
    formData.commercialEggs,
    formData.crackEggs,
    formData.wasteEggs,
    formData.openingFemale,
  ]);

  useEffect(() => {
    const opening = parseFloat(formData.openingFemaleFeedStock) || 0;
    const consumed = parseFloat(formData.femaleFeedConsumption) || 0;
    const stockIn = parseFloat(formData.femaleStockInn) || 0;
    const closing = opening - consumed + stockIn;
    if (formData.closingFemaleFeed !== closing.toFixed(2)) {
      setFormData((prev) => ({
        ...prev,
        closingFemaleFeed: closing.toFixed(2),
      }));
    }
  }, [
    formData.openingFemaleFeedStock,
    formData.femaleFeedConsumption,
    formData.femaleStockInn,
  ]);

  useEffect(() => {
    const opening = parseFloat(formData.openingMaleFeedStock) || 0;
    const consumed = parseFloat(formData.maleFeedConsumption) || 0;
    const stockIn = parseFloat(formData.maleStockInn) || 0;
    const closing = opening - consumed + stockIn;
    if (formData.closingMaleFeed !== closing.toFixed(2)) {
      setFormData((prev) => ({ ...prev, closingMaleFeed: closing.toFixed(2) }));
    }
  }, [
    formData.openingMaleFeedStock,
    formData.maleFeedConsumption,
    formData.maleStockInn,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: formData.date,
      batch_number: formData.batchNumber,
      age: parseInt(formData.age), // still needed in backend
      stage: formData.stage,
      shed: formData.shed,

      opening_female: parseInt(formData.openingFemale),
      female_mortality: parseInt(formData.femaleMortality),
      closing_female: parseInt(formData.closingFemale),
      cumulative_female_mortality: parseInt(formData.cumulativeFemaleMortality),
      cumulative_female_mortality_percentage: parseFloat(
        formData.cumulativeFemaleMortalityPercentage
      ),

      opening_male: parseInt(formData.openingMale),
      male_mortality: parseInt(formData.maleMortality),
      closing_male: parseInt(formData.closingMale),
      cumulative_male_mortality: parseInt(formData.cumulativeMaleMortality),
      cumulative_male_mortality_percentage: parseFloat(
        formData.cumulativeMaleMortalityPercentage
      ),

      hatching_eggs: parseInt(formData.hatchingEggs),
      pullet_eggs: parseInt(formData.pulletEggs),
      commercial_eggs: parseInt(formData.commercialEggs),
      crack_eggs: parseInt(formData.crackEggs),
      waste_eggs: parseInt(formData.wasteEggs),
      total_eggs: parseInt(formData.totalEggs),
      total_eggs_percentage: parseFloat(formData.totalEggsPercentage),
      hatching_egg_percentage: parseFloat(formData.hatchingEggPercentage),

      opening_female_feed_stock: parseFloat(formData.openingFemaleFeedStock),
      female_feed_consumption: parseFloat(formData.femaleFeedConsumption),
      female_stock_in: parseFloat(formData.femaleStockInn),
      closing_female_feed: parseFloat(formData.closingFemaleFeed),

      opening_male_feed_stock: parseFloat(formData.openingMaleFeedStock),
      male_feed_consumption: parseFloat(formData.maleFeedConsumption),
      male_stock_in: parseFloat(formData.maleStockInn),
      closing_male_feed: parseFloat(formData.closingMaleFeed),
    };
    console.log("Sending Payload:", payload);

    try {
      const response = await fetch("http://localhost:8000/api/daily-entries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit entry");

      alert("Daily entry saved successfully!");
      setFormData(getInitialFormData());
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mt-4">
      <form className="bg-light p-4 rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Daily Entry Report</h2>

        {/* Row 1: Date, Batch Number, Age */}
        {/* Row 1: Date, Batch Number, Age, Stage, Shed */}
        <div className="row mb-3">
          <div className="col-md-2">
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <label>Batch Number</label>
            <select
              name="batchNumber"
              className="form-control"
              value={formData.batchNumber}
              onChange={handleChange}
              required
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batch_number}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label>Age</label>
            <input
              type="text"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label>Stage</label>
            <select
              name="stage"
              className="form-control"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="">Select Stage</option>
              <option value="Chick">Chick</option>
              <option value="Grower">Grower</option>
              <option value="Layer">Layer</option>
            </select>
          </div>

          <div className="col-md-3">
            <label>Shed</label>
            <select
              name="shed"
              className="form-control"
              value={formData.shed}
              onChange={handleChange}
            >
              <option value="">Select Shed</option>
              <option value="Chick Shed">Chick Shed</option>
              <option value="Grower Shed">Grower Shed</option>
              <option value="Shed 1">Shed 1</option>
              <option value="Shed 2">Shed 2</option>
              <option value="Shed 3">Shed 3</option>
              <option value="Shed 4">Shed 4</option>
            </select>
          </div>
        </div>

        {/* Row 2: Female Data */}
        <div className="row mb-3">
          <div className="col-md-2">
            <label>Opening Female</label>
            <input
              type="number"
              name="openingFemale"
              className="form-control"
              value={formData.openingFemale}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Female Mortality</label>
            <input
              type="number"
              name="femaleMortality"
              className="form-control"
              value={formData.femaleMortality}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Closing Female</label>
            <input
              type="number"
              name="closingFemale"
              className="form-control fw-bold bg-light"
              value={formData.closingFemale}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label>Cumulative Female Mortality</label>
            <input
              type="number"
              name="cumulativeFemaleMortality"
              className="form-control"
              value={formData.cumulativeFemaleMortality}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Cumulative Female Mortality %</label>
            <input
              type="number"
              name="cumulativeFemaleMortalityPercentage"
              className="form-control"
              value={formData.cumulativeFemaleMortalityPercentage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 3: Male Data */}
        <div className="row mb-3">
          <div className="col-md-2">
            <label>Opening Male</label>
            <input
              type="number"
              name="openingMale"
              className="form-control"
              value={formData.openingMale}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Male Mortality</label>
            <input
              type="number"
              name="maleMortality"
              className="form-control"
              value={formData.maleMortality}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Closing Male</label>
            <input
              type="number"
              name="closingMale"
              className="form-control fw-bold bg-light"
              value={formData.closingMale}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label>Cumulative Male Mortality</label>
            <input
              type="number"
              name="cumulativeMaleMortality"
              className="form-control"
              value={formData.cumulativeMaleMortality}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Cumulative Male Mortality %</label>
            <input
              type="number"
              name="cumulativeMaleMortalityPercentage"
              className="form-control"
              value={formData.cumulativeMaleMortalityPercentage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 4: Egg data */}
        <div className="row mb-3">
          <div className="col-md-2">
            <label>Hatching Eggs</label>
            <input
              type="number"
              name="hatchingEggs"
              className="form-control"
              value={formData.hatchingEggs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Pullet</label>
            <input
              type="number"
              name="pulletEggs"
              className="form-control"
              value={formData.pulletEggs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Commercial Eggs</label>
            <input
              type="number"
              name="commercialEggs"
              className="form-control"
              value={formData.commercialEggs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Crack Eggs</label>
            <input
              type="number"
              name="crackEggs"
              className="form-control"
              value={formData.crackEggs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Waste Eggs</label>
            <input
              type="number"
              name="wasteEggs"
              className="form-control"
              value={formData.wasteEggs}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label>Total Eggs</label>
            <input
              type="number"
              name="totalEggs"
              className="form-control fw-bold bg-light"
              value={formData.totalEggs}
              readOnly
            />
          </div>
          <div className="col-md-2">
            <label>Total Eggs %</label>
            <input
              type="number"
              name="totalEggsPercentage"
              className="form-control fw-bold bg-light"
              value={formData.totalEggsPercentage}
              readOnly
            />
          </div>
          <div className="col-md-2">
            <label>Hatching Egg %</label>
            <input
              type="number"
              name="hatchingEggPercentage"
              className="form-control fw-bold bg-light"
              value={formData.hatchingEggPercentage}
              readOnly
            />
          </div>
        </div>

        {/* Row 5: Female Feed */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label>Opening Female Feed Stock</label>
            <input
              type="number"
              name="openingFemaleFeedStock"
              className="form-control"
              value={formData.openingFemaleFeedStock}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Female Feed Consumption</label>
            <input
              type="number"
              name="femaleFeedConsumption"
              className="form-control"
              value={formData.femaleFeedConsumption}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Female Stock Inn</label>
            <input
              type="number"
              name="femaleStockInn"
              className="form-control"
              value={formData.femaleStockInn}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Closing Female Feed</label>
            <input
              type="number"
              name="closingFemaleFeed"
              className="form-control fw-bold bg-light"
              value={formData.closingFemaleFeed}
              readOnly
            />
          </div>
        </div>

        {/* Row 6: Male Feed */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label>Opening Male Feed Stock</label>
            <input
              type="number"
              name="openingMaleFeedStock"
              className="form-control"
              value={formData.openingMaleFeedStock}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Male Feed Consumption</label>
            <input
              type="number"
              name="maleFeedConsumption"
              className="form-control"
              value={formData.maleFeedConsumption}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Male Stock Inn</label>
            <input
              type="number"
              name="maleStockInn"
              className="form-control"
              value={formData.maleStockInn}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Closing Male Feed</label>
            <input
              type="number"
              name="closingMaleFeed"
              className="form-control fw-bold bg-light"
              value={formData.closingMaleFeed}
              readOnly
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DailyEntryReport;
