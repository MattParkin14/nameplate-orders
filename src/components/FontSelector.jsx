import React, { useState, useEffect } from 'react';

// Use Vite's glob import to get all TTF files
const fontModules = import.meta.glob('../assets/Font/*.ttf', {
  eager: true,
  as: 'url'
});

const FontSelector = ({ value, onChange, previewText }) => {
  const [fontFaces, setFontFaces] = useState([]);
  const [loadedFonts, setLoadedFonts] = useState({});
  
  // Process font files and create @font-face rules
  useEffect(() => {
    const fonts = Object.entries(fontModules).reduce((acc, [path, url]) => {
      // Extract font name from the path (filename without extension)
      const fontName = path.split('/').pop().split('.')[0];
      
      // Create a style element for the @font-face rule
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: "${fontName}";
          src: url("${url}") format("truetype");
        }
      `;
      document.head.appendChild(style);
      
      return [...acc, fontName];
    }, []);
    
    setFontFaces(fonts);
  }, []);

  // Load fonts and track their loading status
  useEffect(() => {
    const loadFonts = async () => {
      const fontLoadingStatus = {};
      
      for (const fontName of fontFaces) {
        try {
          const font = new FontFace(fontName, `url(${fontModules[`../assets/Font/${fontName}.ttf`]})`);
          await font.load();
          document.fonts.add(font);
          fontLoadingStatus[fontName] = true;
        } catch (error) {
          console.error(`Failed to load font ${fontName}:`, error);
          fontLoadingStatus[fontName] = false;
        }
      }
      
      setLoadedFonts(fontLoadingStatus);
    };

    if (fontFaces.length > 0) {
      loadFonts();
    }
  }, [fontFaces]);

  const handleSelect = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <select
          value={value}
          onChange={handleSelect}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Font</option>
          {fontFaces.map((fontName) => (
            <option key={fontName} value={fontName}>
              {fontName.charAt(0).toUpperCase() + fontName.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {value && previewText && loadedFonts[value] && (
        <div className="p-4 border rounded-md bg-gray-50">
          <p className="text-xl text-gray-500 mb-2">Preview:</p>
          <p 
            className="text-3xl break-words"
            style={{ 
              fontFamily: value,
              minHeight: '2em'
            }}
          >
            {previewText}
          </p>
        </div>
      )}
    </div>
  );
};

export default FontSelector;