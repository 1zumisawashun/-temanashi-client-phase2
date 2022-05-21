import {
  ScrollPosition,
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageProp {
  src: string;
  scrollPosition: ScrollPosition;
}

const Image: React.VFC<ImageProp> = ({ src, scrollPosition }) => {
  return (
    <LazyLoadImage
      src={src}
      className="image"
      scrollPosition={scrollPosition}
    />
  );
};

export default trackWindowScroll(Image);
