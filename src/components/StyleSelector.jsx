import React, { useState } from 'react';

// Use Vite's glob import feature to dynamically import all images
const imageModules = import.meta.glob('../assets/Style/*.{jpg,jpeg,png}', {
  eager: true,
  as: 'url'
});

const StyleSelector = ({ value, onChange }) => {
  // Convert the imported modules into a more usable format
  const styleImages = Object.entries(imageModules).reduce((acc, [path, url]) => {
    // Extract the filename without extension from the path
    const filename = path.split('/').pop().split('.')[0].toLowerCase();
    return {
      ...acc,
      [filename]: url
    };
  }, {});

  const availableStyles = Object.keys(styleImages);
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
          <option value="">Select Style</option>
          {availableStyles.map((style) => (
            <option key={style} value={style}>
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {selectedImage && (
        <div className="w-full max-w-xl">
          <img
            src={styleImages[selectedImage]}
            alt={selectedImage}
            className="w-full h-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default StyleSelector;