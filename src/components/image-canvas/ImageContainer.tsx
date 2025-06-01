import { Button } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import documentImage from "../../assets/data/pages/a2cbec1124234a6d846f908ba9531a2e-1.jpg";

export default function ImageContainer() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [style, setStyle] = useState({});
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [naturalSize, setNaturalSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete) {
      const { width, height } = img.getBoundingClientRect();
      console.log(width, height, "@width, height");
      setImageSize({ width, height });
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    } else if (img) {
      img.onload = () => {
        const { width, height } = img.getBoundingClientRect();
        console.log(width, height, "@width, height onLoad");
        setImageSize({ width, height });
        setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
    }
  }, []);

  const scaleBox = ([x1, y1, x2, y2]: number[]) => {
    const { width: renderedWidth, height: renderedHeight } = imageSize;
    const { width: originalWidth, height: originalHeight } = naturalSize;
    const scaleX = renderedWidth / originalWidth;
    const scaleY = renderedHeight / originalHeight;

    console.log(scaleX, scaleY, "@scale");

    return {
      left: x1 * scaleX,
      top: y1 * scaleY,
      width: (x2 - x1) * scaleX,
      height: (y2 - y1) * scaleY,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    };
  };

  const highlightImage = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const style = scaleBox([x, y, width, height]);
    console.log(style, "@style");
    setStyle(style);
  };

  return (
    <div>
      <div className="image-container w-full h-full relative">
        <img
          ref={imageRef}
          src={documentImage}
          alt="document-image"
          className="w-full h-full"
        />
        <div className="hightlight-box absolute" style={style}></div>
      </div>
      <Button onClick={() => highlightImage(110, 483, 283, 499)}>
        Highlight
      </Button>
    </div>
  );
}
