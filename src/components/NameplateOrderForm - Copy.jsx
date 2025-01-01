import React, { useState } from 'react';

const NameplateOrderForm = () => {
  const [formData, setFormData] = useState({
    nameFacebook: '',
    email: '',
    nameOnPlate: '',
    style: '',
    baseColor: '',
    accentColor: '',
    font: '',
    size: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Google Form ID from URL
    const formId = 'e/1FAIpQLSfxpk_A9XuWTsh-qf4gvqtO2KE20DYOHVDYGAOQYkwWQ288Zw';
    
    // Create the prefilled URL with the correct entry IDs
    const params = new URLSearchParams({
      'usp': 'pp_url',
      'entry.1145160916': formData.nameFacebook,
      'entry.1878643777': formData.email,
      'entry.387268001': formData.nameOnPlate,
      'entry.914394063': formData.style,
      'entry.397317509': formData.baseColor,
      'entry.874300709': formData.accentColor,
      'entry.2082094946': formData.font,
      'entry.21232468': formData.size
    });

    // Direct form URL (without the /e/ part)
    const url = `https://docs.google.com/forms/d/${formId}/viewform?${params.toString()}`;
    
    // Open the prefilled form in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Nameplate Order Form</h2>
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
          <label htmlFor="baseColor" className="block text-sm font-medium text-gray-700">Base Color</label>
          <input
            type="text"
            id="baseColor"
            name="baseColor"
            value={formData.baseColor}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            placeholder="e.g., Black, White, Silver"
          />
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

        <div className="space-y-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Preview and Submit Order
          </button>
          <p className="text-sm text-gray-600 text-center">
            You'll be taken to a pre-filled form to review and submit your order
          </p>
        </div>
      </form>
    </div>
  );
};

export default NameplateOrderForm;