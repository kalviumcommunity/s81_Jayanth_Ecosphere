import React, { useState } from 'react';

function AddressForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    address: '',
    pincode: '',
    area: '',
    addressType: '', // e.g. "Home", "Work"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert pincode to Number
    const dataToSubmit = {
      ...formData,
      pincode: Number(formData.pincode)
    };
    if (onSubmit) onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Update Address</h2>

      <label className="block mb-2">
        Country:
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2">
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Pincode:
        <input
          type="number"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Area:
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Address Type:
        <select
          name="addressType"
          value={formData.addressType}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">Select Type</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Address
      </button>
    </form>
  );
}

export default AddressForm;