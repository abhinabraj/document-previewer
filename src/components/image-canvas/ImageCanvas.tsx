import { useCallback, useEffect, useRef, useState } from "react";
import documentImage from "../../assets/data/pages/a2cbec1124234a6d846f908ba9531a2e-1.jpg";
import type {
  Section,
  SelectedSection,
} from "../../interface/section.interface";

import Select from "../Select";

const CANVAS_HEIGHT = 930;
const CANVAS_WIDTH = 900;

interface Props {
  allSections: Section[];
  selectedSection: SelectedSection[];
  hoveredSectionId: number | null;
  setHoveredSectionId: (id: number | null) => void;
}

export default function ImageCanvas({
  allSections,
  selectedSection,
  hoveredSectionId,
  setHoveredSectionId,
}: Props) {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [docImage, setDocImage] = useState<HTMLImageElement | null>(null);
  const [baseScale, setBaseScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const image = new Image();
    image.src = documentImage;
    image.onload = () => {
      setDocImage(image);
    };
  }, []);

  useEffect(() => {
    if (!docImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    }

    const scale = Math.min(
      CANVAS_WIDTH / docImage.naturalWidth,
      CANVAS_HEIGHT / docImage.naturalHeight
    );
    const imageWidth = docImage.naturalWidth * scale;
    const imageHeight = docImage.naturalHeight * scale;

    setOffset({
      x: (CANVAS_WIDTH - imageWidth) / 2,
      y: (CANVAS_HEIGHT - imageHeight) / 2,
    });

    setBaseScale(scale);
    if (context) {
      setContext(context);
    }
  }, [docImage]);

  const drawImage = useCallback(() => {
    if (!docImage || !canvasRef.current) return;

    const finalScale = zoom * baseScale;
    const imageWidth = docImage.naturalWidth * finalScale;
    const imageHeight = docImage.naturalHeight * finalScale;

    context?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context?.drawImage(docImage, offset.x, offset.y, imageWidth, imageHeight);
  }, [docImage, baseScale, context, zoom, offset]);

  const highlightImage = useCallback(
    (position: number[], isHover: boolean = false) => {
      const [x1, y1, x2, y2] = position;
      if (!docImage || !canvasRef.current) return;

      const finalScale = zoom * baseScale;

      const boxX = x1 * finalScale + offset.x;
      const boxY = y1 * finalScale + offset.y;
      const boxWidth = (x2 - x1) * finalScale;
      const boxHeight = (y2 - y1) * finalScale;

      if (context) {
        context.strokeStyle = isHover ? "blue" : "red";
        context.fillStyle = isHover
          ? "rgba(0, 0, 255, 0.2)"
          : "rgba(255, 0, 0, 0.3)";

        context.fillRect(boxX, boxY, boxWidth, boxHeight);
        context.strokeRect(boxX, boxY, boxWidth, boxHeight);
      }
    },
    [context, docImage, baseScale, zoom, offset]
  );

  useEffect(() => {
    if (!docImage || !context) return;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawImage();
    allSections.forEach((section) => {
      const isHover = hoveredSectionId === section.id;
      if (selectedSection.some((s) => s.id === section.id) || isHover) {
        highlightImage(section.content?.position ?? [], isHover);
      }
    });
  }, [
    docImage,
    selectedSection,
    context,
    hoveredSectionId,
    allSections,
    drawImage,
    highlightImage,
  ]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.1));

  const resetToFit = () => {
    if (!docImage || !canvasRef.current) return;

    const scale = Math.min(
      canvasRef.current.width / docImage.naturalWidth,
      canvasRef.current.height / docImage.naturalHeight
    );

    setZoom(1);
    setBaseScale(scale);

    const imageWidth = docImage.naturalWidth * scale;
    const imageHeight = docImage.naturalHeight * scale;

    setOffset({
      x: (canvasRef.current.width - imageWidth) / 2,
      y: (canvasRef.current.height - imageHeight) / 2,
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!docImage || !canvasRef.current) return;
    e.preventDefault();

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newZoom = Math.max(0.1, Math.min(zoom + delta, 5));

    const prevScale = zoom * baseScale;
    const nextScale = newZoom * baseScale;

    const dx = (mouseX - offset.x) / prevScale;
    const dy = (mouseY - offset.y) / prevScale;

    const newOffsetX = mouseX - dx * nextScale;
    const newOffsetY = mouseY - dy * nextScale;

    setZoom(newZoom);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!docImage || !canvasRef.current) return;

    if (isDragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = { x: e.clientX, y: e.clientY };
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    } else {
      let found = false;
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const finalScale = zoom * baseScale;

      allSections.forEach((section) => {
        const [x1, y1, x2, y2] = section.content?.position ?? [];
        const boxX = x1 * finalScale + offset.x;
        const boxY = y1 * finalScale + offset.y;
        const boxWidth = (x2 - x1) * finalScale;
        const boxHeight = (y2 - y1) * finalScale;
        if (
          mouseX > boxX &&
          mouseX <= boxX + boxWidth &&
          mouseY >= boxY &&
          mouseY <= boxY + boxHeight
        ) {
          setHoveredSectionId(section.id);
          found = true;
        }
      });

      if (!found) {
        setHoveredSectionId(null);
      }
    }
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <div className="image-preview flex flex-col items-center relative">
      <Select setZoom={setZoom} resetToFit={resetToFit} />
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onWheel={handleWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      ></canvas>
      <div className="absolute bottom-24 right-16 bg-slate-200 dark:bg-slate-950 flex flex-col items-center rounded-full">
        <span
          onClick={zoomOut}
          className="px-4 py-2  dark:text-white text-2xl cursor-pointer"
        >
          -
        </span>
        <span
          onClick={zoomIn}
          className="px-4 py-2  dark:text-white text-2xl cursor-pointer"
        >
          +
        </span>
      </div>
    </div>
  );
}
