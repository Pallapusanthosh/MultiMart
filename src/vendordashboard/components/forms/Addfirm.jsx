import React, { useState } from 'react';
import { APIpath } from '../../helpers/Apipath';

function Addfirm({ showProductsHandler }) {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [firmImage, setFirmImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleimageupload = (e) => {
    const selectedImage = e.target.files[0];
    setFirmImage(selectedImage);
  };

  const handlecategorychange = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleregionchange = (e) => {
    const value = e.target.value;
    setRegion((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const logintoken = localStorage.getItem('logintoken');
      if (!logintoken) {
        console.log('User not logged in');
      }

      const formData = new FormData();
      formData.append('firmname', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      if (firmImage) formData.append('image', firmImage);
      category.forEach((c) => formData.append('category', c));
      region.forEach((r) => formData.append('region', r));

      const response = await fetch(`${APIpath}/firm/add-firm`, {
        method: 'POST',
        headers: { token: `${logintoken}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert(data.message);
        localStorage.setItem('firmid', data.firm_id);
        showProductsHandler();
        setFirmName('');
        setArea('');
        setCategory([]);
        setRegion([]);
        setOffer('');
        setFirmImage(null);
        alert('Firm added successfully');
      } else {
        alert('Failed to add firm');
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  const regionOptions = ['south-indian', 'north-indian', 'bakery', 'chinese'];

  return (
    <div className="w-full flex justify-center py-10 px-4">
      {/* We use a new wrapper class to AVOID .tableform CSS from App.css */}
      <form
        onSubmit={handlesubmit}
        className="w-full max-w-lg bg-white/95 border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h3 className="text-2xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Add Firm
        </h3>

        {/* Firm Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Firm Name
          </label>
          <input
            type="text"
            name="firmName"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            placeholder="Enter the Firm Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Area
          </label>
          <input
            type="text"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter the Area"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
        </div>

        {/* Category */}
        <div>
          <p className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </p>
          <div className="flex gap-6">
            {['veg', 'non-veg'].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={handlecategorychange}
                  className="accent-indigo-600 w-4 h-4"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div>
          <p className="block text-sm font-semibold text-gray-700 mb-2">
            Regions
          </p>
          <div className="grid grid-cols-2 gap-3">
            {regionOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-gray-700 capitalize">
                <input
                  type="checkbox"
                  value={opt}
                  checked={region.includes(opt)}
                  onChange={handleregionchange}
                  className="accent-purple-600 w-4 h-4"
                />
                {opt.replace('-', ' ')}
              </label>
            ))}
          </div>
        </div>

        {/* Offer */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Offer
          </label>
          <input
            type="text"
            name="offer"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="Enter the offer (e.g. 20% OFF)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
        </div>

        {/* Firm Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Firm Image
          </label>
          <input
            type="file"
            onChange={handleimageupload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:from-indigo-700 hover:to-purple-700 transition-transform transform hover:scale-[1.02]"
        >
           {loading ?  "Submitting":"Submit"}
        </button>
      </form>
    </div>
  );
}

export default Addfirm;
