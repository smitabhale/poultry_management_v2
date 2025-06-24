
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function CreateFlock() {
  const [formData, setFormData] = useState({
    date: '',
    age: '',
    batchNumber: '',
    openingFemale: '',
    openingMale: '',
    rate: '',
  });

  // const [entries, setEntries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare data in the format backend expects (snake_case keys)
    const dataToSend = {
      date: formData.date,
      age: formData.age,
      batch_number: formData.batchNumber,     // backend expects batch_number, not batchNumber
      opening_female: formData.openingFemale,
      opening_male: formData.openingMale,
      rate: formData.rate,
    };
  
    try {
      // POST request to your Django backend API
      const response = await axios.post('http://127.0.0.1:8000/api/flocks/', dataToSend);
  
      alert('Flock created successfully!');
  
      // Optionally add the saved data to entries (to show below)
      // setEntries(prev => [...prev, response.data]);
  
      // Reset form after successful submission
      setFormData({
        date: '',
        age: '',
        batchNumber: '',
        openingFemale: '',
        openingMale: '',
        rate: '',
      });
    } catch (error) {
      console.error('Error creating flock:', error);
      alert('Failed to create flock. Please try again.');
    }
  };
  

  return (
    <div className="container mt-4">
      <form className="w-50 bg-light p-4 rounded shadow mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Create Flock</h2>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Age</label>
            <input type="number" step="0.1" className="form-control" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Batch Number</label>
            <input type="text" className="form-control" name="batchNumber" value={formData.batchNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Opening Female</label>
            <input type="number" className="form-control" name="openingFemale" value={formData.openingFemale} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Opening Male</label>
            <input type="number" className="form-control" name="openingMale" value={formData.openingMale} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Rate</label>
            <input type="number" step="0.01" className="form-control" name="rate" value={formData.rate} onChange={handleChange} />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

    </div>
  );
}

export default CreateFlock;

