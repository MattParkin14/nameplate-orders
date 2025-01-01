
import React, { useState } from 'react';
import BaseMaterialSelector from './BaseMaterialSelector';

const NameplateOrderForm = () => {
  const [formData, setFormData] = useState({
    material: '',
    size: '',
    color: '',
    email: '',
    facebookName: '',
    name: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const sizes = ['Small (6")', 'Medium (8")', 'Large (10")'];
  const colors = ['Black', 'Gold', 'Silver', 'Rose Gold'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.material || !formData.size || !formData.color || 
        !formData.email || !formData.name) {
      setError('Please fill in all required fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Order submitted:', formData);
      setSubmitted(true);
      setError('');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          Thank you for your order! We will contact you at {formData.email} with further details.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Custom Nameplate Order</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Material *
          </label>
          <BaseMaterialSelector 
            value={formData.material}
            onChange={(value) => {
              setFormData(prev => ({
                ...prev,
                material: value
              }));
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Size *
          </label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Color *
          </label>
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Color</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Facebook Name *
          </label>
          <input
            type="text"
            name="facebookName"
            value={formData.facebookName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default NameplateOrderForm;
