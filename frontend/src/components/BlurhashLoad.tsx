import { useEffect, useState } from "react";
/* import { importImagesUrls } from "../utils/images"; */
import { OptimizedImage } from "./Optimized";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

/* const images = importImagesUrls(); */

function BlurHashLazyLoading() {
   const [images, setImages] = useState<{ name: string; blurhash: string }[]>(
      []
   );

   const fetchImages = async () => {
      const images = await fetch("http://localhost:8000/images");

      setImages((await images.json()).images);
   };

   useEffect(() => {
      fetchImages();
   }, []);

  return (
      <div className="image__container">
         {
            images.map((image) => (
               <OptimizedImage key={image.name} image={image} />
            ))
         }

      </div>
  );
}

export { BlurHashLazyLoading };