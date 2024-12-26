import React, { useState, useEffect } from 'react';

const BaseMaterialSelector = ({ value, onChange }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(value || '');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const path = 'nameplate-order/src/assets/Base';
        console.log('Reading directory:', path);
        
        const response = await window.fs.readdir(path);
        console.log('Directory contents:', response);
        
        if (!response || !Array.isArray(response)) {
          throw new Error('Invalid directory response');
        }
        
        const jpgFiles = response
          .filter(file => file.toLowerCase().endsWith('.jpg'))
          .map(file => file.replace('.jpg', ''));
        
        console.log('Found JPG files:', jpgFiles);
        
        if (jpgFiles.length === 0) {
          setError('No material images found in the Base directory');
          return;
        }
        
        setImages(jpgFiles);
        setError('');
        
        if (!value && jpgFiles.length > 0) {
          setSelectedImage(jpgFiles[0]);
          onChange(jpgFiles[0]);
        }
      } catch (error) {
        console.error('Failed to load materials:', error);
        setError(`Failed to load materials: ${error.message}`);
        
        // Let's try to help with debugging
        console.log('Current window.fs capabilities:', Object.keys(window.fs));
      }
    };
    
    loadImages();
  }, [value, onChange]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="w-full">
          <select
            value={selectedImage}
            onChange={(e) => {
              setSelectedImage(e.target.value);
              onChange(e.target.value);
            }}
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
              src={`/nameplate-order/src/assets/Base/${selectedImage}.jpg`}
              alt={selectedImage}
              className="w-full h-full object-cover rounded-md"
              onError={(e) => {
                console.error('Image failed to load:', selectedImage);
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default BaseMaterialSelector;