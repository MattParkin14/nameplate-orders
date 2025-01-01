
import React, { useState, useEffect } from 'react';

// Import images directly using Vite's asset handling
import blueImg from '../assets/Base/blue.jpg';
import blackImg from '../assets/Base/black.jpg';

const BaseMaterialSelector = ({ value, onChange }) => {
  const materialImages = {
    blue: blueImg,
    black: blackImg
  };

  const availableMaterials = Object.keys(materialImages);
  const [selectedImage, setSelectedImage] = useState(value || '');
  
  useEffect(() => {
    if (!value && availableMaterials.length > 0) {
      setSelectedImage(availableMaterials[0]);
      onChange(availableMaterials[0]);
    }
  }, [value, onChange]);

  const handleSelect = (event) => {
    setSelectedImage(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <select
          value={selectedImage}
          onChange={handleSelect}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Material</option>
          {availableMaterials.map((material) => (
            <option key={material} value={material}>
              {material.charAt(0).toUpperCase() + material.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {selectedImage && (
        <div className="w-full max-w-xl">
          <img
            src={materialImages[selectedImage]}
            alt={selectedImage}
            className="w-full h-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default BaseMaterialSelector;
