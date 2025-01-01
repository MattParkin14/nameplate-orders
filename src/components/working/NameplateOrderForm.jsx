import React, { useState, useEffect } from 'react';

// Import images for base materials
import blueImg from '../assets/Base/blue.jpg';
import blackImg from '../assets/Base/black.jpg';

const materialImages = {
  blue: blueImg,
  black: blackImg
};

const NameplateOrderForm = () => {
  const [formData, setFormData] = useState({
    nameFacebook: '',
    email: '',
    nameOnPlate: '',
    style: '',
    baseMaterial: '',
    accentColor: '',
    font: '',
    size: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [selectedImage, setSelectedImage] = useState('');
  const availableMaterials = Object.keys(materialImages);

  useEffect(() => {
    if (!formData.baseMaterial && availableMaterials.length > 0) {
      setSelectedImage(availableMaterials[0]);
      setFormData(prev => ({
        ...prev,
        baseMaterial: availableMaterials[0]
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'baseMaterial') {
      setSelectedImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      const response = await fetch('https://holy-dew-6b09.lively-sea-9721.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus({
        loading: false,
        success: true,
        error: null
      });

      // Reset form after successful submission
      setFormData({
        nameFacebook: '',
        email: '',
        nameOnPlate: '',
        style: '',
        baseMaterial: '',
        accentColor: '',
        font: '',
        size: ''
      });
      setSelectedImage('');

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.message
      });
    }
  };

  if (status.success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Order Submitted Successfully!</h2>
          <p className="text-gray-600 mb-4">Thank you for your order. Your submission has been recorded and we'll be in touch soon.</p>
          <button
            onClick={() => setStatus({ loading: false, success: false, error: null })}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Nameplate Order Form</h2>
      {status.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {status.error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nameFacebook" className="block text-sm font-medium text-gray-700">Name / Facebook Name</label>
          <input
            type="text"
            id="nameFacebook"
            name="nameFacebook"
            value={formData.nameFacebook}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="nameOnPlate" className="block text-sm font-medium text-gray-700">Name on Plate</label>
          <input
            type="text"
            id="nameOnPlate"
            name="nameOnPlate"
            value={formData.nameOnPlate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-700">Style</label>
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          >
            <option value="">Select a style</option>
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
            <option value="Minimalist">Minimalist</option>
          </select>
        </div>

        <div>
          <label htmlFor="baseMaterial" className="block text-sm font-medium text-gray-700">Base Material</label>
          <select
            id="baseMaterial"
            name="baseMaterial"
            value={formData.baseMaterial}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          >
            <option value="">Select Material</option>
            {availableMaterials.map((material) => (
              <option key={material} value={material}>
                {material.charAt(0).toUpperCase() + material.slice(1)}
              </option>
            ))}
          </select>
          {selectedImage && (
            <div className="mt-2">
              <img
                src={materialImages[selectedImage]}
                alt={selectedImage}
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700">Accent Color</label>
          <input
            type="text"
            id="accentColor"
            name="accentColor"
            value={formData.accentColor}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            placeholder="e.g., Gold, Silver, Rose Gold"
          />
        </div>

        <div>
          <label htmlFor="font" className="block text-sm font-medium text-gray-700">Font</label>
          <select
            id="font"
            name="font"
            value={formData.font}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          >
            <option value="">Select a font</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Calibri">Calibri</option>
            <option value="Script">Script</option>
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          >
            <option value="">Select a size</option>
            <option value="Small">Small (2" x 8")</option>
            <option value="Medium">Medium (3" x 12")</option>
            <option value="Large">Large (4" x 16")</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            status.loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {status.loading ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
};

export default NameplateOrderForm;