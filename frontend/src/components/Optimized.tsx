import { useState } from "react";
import { Blurhash } from "react-blurhash";
import {
  LazyLoadImage,
} from "react-lazy-load-image-component";
import styled from "styled-components";

const StyledLazyLoadImage = styled(LazyLoadImage)`
  @media only screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
  }

  @media only screen and (max-width: 380px) {
    width: 80%;
    height: 80%;
  }
`

const StyledBlurhash = styled(Blurhash)`
  z-index: 20;
  position: absolute !important;
  top: 0;
  left: 0;

  @media only screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
  }

  @media only screen and (max-width: 380px) {
    width: 80%;
    height: 80%;
  }
`;

interface OptimizedImageProps {
  image: { name: string; blurhash: string };
}

function OptimizedImage(props: OptimizedImageProps) {
  const { image } = props;

  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    console.log("Started: ");
    setLoadStarted(true);
  };

  const url = `http://localhost:8000/${image.name}`;

  return (
    <div className="image__wrapper">
      <StyledLazyLoadImage key={image.name} src={url} height={500} width={333}
      onLoad={handleLoad} beforeLoad={handleLoadStarted} />

      {
        !isLoaded && isLoadStarted && (
          <StyledBlurhash hash={image.blurhash} height={500} width={333} resolutionX={32} resolutionY={32} punch={1} />
        )
      }
    </div>
  );
}

export { OptimizedImage };