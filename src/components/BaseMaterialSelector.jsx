import React, { useState, useEffect } from 'react';

const BaseMaterialSelector = ({ value, onChange }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(value || '');
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log('Attempting to read directory...');
        // First try to list the directory
        const files = await window.fs.readdir('src/assets/Base/');
        console.log('Files found:', files);
        
        // Filter for JPG files and remove extension
        const jpgFiles = files
          .filter(file => file.toLowerCase().endsWith('.jpg'))
          .map(file => file.replace('.jpg', ''));
        
        console.log('JPG files found:', jpgFiles);
        
        setImages(jpgFiles);
        if (!value && jpgFiles.length > 0) {
          setSelectedImage(jpgFiles[0]);
          onChange(jpgFiles[0]);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };
    
    loadImages();
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
          {images.map((image) => (
            <option key={image} value={image}>
              {image}
            </option>
          ))}
        </select>
      </div>
      
      {selectedImage && (
        <div className="w-24 h-24">
          <img
            src={`/src/assets/Base/${selectedImage}.jpg`}
            alt={selectedImage}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default BaseMaterialSelector;