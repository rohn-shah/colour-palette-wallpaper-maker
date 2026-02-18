import { useEffect, useRef } from "react";
import type { PaletteState } from "@/types/palette";
import { drawPalette } from "@/lib/drawPalette";

type WallpaperCanvasProps = {
  state: PaletteState;
};

export function WallpaperCanvas({ state }: WallpaperCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvas = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const aspectRatio = 16 / 9;
      const dpr = window.devicePixelRatio || 1;

      let canvasWidth = containerWidth;
      let canvasHeight = containerWidth / aspectRatio;

      if (canvasHeight > containerHeight) {
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * aspectRatio;
      }

      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      ctx.scale(dpr, dpr);

      drawPalette(ctx, canvasWidth, canvasHeight, state);
    };

    updateCanvas();

    const resizeObserver = new ResizeObserver(updateCanvas);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [state]);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center bg-muted/20 p-8"
    >
      <canvas
        ref={canvasRef}
        className="max-h-full max-w-full shadow-xl"
      />
    </div>
  );
}
