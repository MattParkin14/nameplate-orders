import React, { useState } from 'react';

// Use Vite's glob import feature to dynamically import all images
const imageModules = import.meta.glob('../assets/Accent/*.{jpg,jpeg,png}', {
  eager: true,
  as: 'url'
});

const AccentSelector = ({ value, onChange }) => {
  // Convert the imported modules into a more usable format
  const accentImages = Object.entries(imageModules).reduce((acc, [path, url]) => {
    // Extract the filename without extension from the path
    const filename = path.split('/').pop().split('.')[0].toLowerCase();
    return {
      ...acc,
      [filename]: url
    };
  }, {});

  const availableAccents = Object.keys(accentImages);
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
          <option value="">Select Accent</option>
          {availableAccents.map((accent) => (
            <option key={accent} value={accent}>
              {accent.charAt(0).toUpperCase() + accent.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {selectedImage && (
        <div className="w-full max-w-xl">
          <img
            src={accentImages[selectedImage]}
            alt={selectedImage}
            className="w-full h-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default AccentSelector;