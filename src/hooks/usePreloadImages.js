import { useState, useEffect } from 'react';

export const usePreloadImages = (imageUrls) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(imageUrls.map(url => preloadImage(url)))
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Still set to true to prevent blocking
      });
  }, [imageUrls]);

  return imagesLoaded;
};
