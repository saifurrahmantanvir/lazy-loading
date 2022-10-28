import { useEffect, useState } from "react";
/* import { importImagesUrls } from "../images"; */
import {
  LazyLoadImage
} from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

/* const images = importImagesUrls(); */

function ReactLazyLoading() {
   const [images, setImages] = useState<{ name: string; blurhash: string }[]>(
      []
   );

  const fetchImages = async () => {
      const images = await fetch("http://localhost:8000/images");

      setImages((await images.json()).images);
      console.log("Images: ", await images.json());
  };

   useEffect(() => {
      fetchImages();
   }, []);

  return (
      <div className="image__container">
         {
            images.map((image) => (
               <LazyLoadImage key={image.name} src={`http://localhost:8000/${image.name}`}
                  height={500} width={333} effect="blur"
                  placeholderSrc={`http://localhost:8000/${image.name}`}
               />
            ))
         }
         
      </div>
  );
}

export { ReactLazyLoading };