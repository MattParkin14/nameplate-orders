import React, { useState } from 'react';

// Use Vite's glob import feature to dynamically import all images
const imageModules = import.meta.glob('../assets/Base/*.{jpg,jpeg,png}', {
  eager: true,
  as: 'url'
});

const BaseMaterialSelector = ({ value, onChange }) => {
  // Convert the imported modules into a more usable format
  const materialImages = Object.entries(imageModules).reduce((acc, [path, url]) => {
    // Extract the filename without extension from the path
    const filename = path.split('/').pop().split('.')[0].toLowerCase();
    return {
      ...acc,
      [filename]: url
    };
  }, {});

  const availableMaterials = Object.keys(materialImages);
  const [selectedImage, setSelectedImage] = useState(value || '');

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