import { importImagesUrls } from "./images";
const images = importImagesUrls();

function BrowserLazyLoading() {
  return (
      <div className="image__container">
         {
            images.map((url: string) => (
               <img key={url} src={url} loading="lazy" alt="random" height="500" width="333" />
            ))
         }
         
      </div>
  );
}

export { BrowserLazyLoading };
