import React, { useState, useEffect } from 'react';

const BaseMaterialSelector = ({ value, onChange }) => {
  const availableMaterials = [
    'blue',
    'black'
  ];

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
    <div className="flex items-center gap-4">
      <div className="w-full">
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
        <div className="w-24 h-24">
          <img
            src={`src/assets/Base/${selectedImage}.jpg`}
            alt={selectedImage}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              console.error(`Failed to load image: src/assets/Base/${selectedImage}.jpg`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BaseMaterialSelector;