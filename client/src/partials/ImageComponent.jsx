import React, { useEffect, useState } from 'react';

const ImageComponent = ({ base64String }) => {
  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
    const decodeBase64Image = () => {
      const img = new Image();
      img.src = `${base64String}`;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setImageDataUrl(dataUrl);
      };
    };

    decodeBase64Image();
  }, [base64String]);

  return <img src={imageDataUrl} alt="Decoded Base64 Image" />;
};

export default ImageComponent;
