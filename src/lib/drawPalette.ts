import type { PaletteState } from "@/types/palette";

export function drawPalette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: PaletteState
): void {
  ctx.fillStyle = state.bgColor;
  ctx.fillRect(0, 0, width, height);

  const isReverse = state.stacking === "reverse";

  if (state.direction === "horizontal") {
    const columnWidth = width * (state.barWidth / 100);
    const columnHeight = height * (state.barHeight / 100);
    const borderRadius = columnWidth / 2;
    const overlapFactor = 0.8;
    const spacing = columnWidth * overlapFactor;
    const totalWidth = columnWidth + (state.columns - 1) * spacing;
    const startX = (width - totalWidth) / 2;
    const startY = (height - columnHeight) / 2;

    const drawOrder = isReverse 
      ? Array.from({ length: state.columns }, (_, i) => state.columns - 1 - i)
      : Array.from({ length: state.columns }, (_, i) => i);

    for (const i of drawOrder) {
      const x = startX + i * spacing;
      const y = startY;
      const color = state.colors[i] || "#888888";

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, columnWidth, columnHeight, borderRadius);
      ctx.fill();
    }
  } else {
    const barWidth = width * (state.barHeight / 100);
    const barHeight = height * (state.barWidth / 100);
    const borderRadius = barHeight / 2;
    const overlapFactor = 0.8;
    const spacing = barHeight * overlapFactor;
    const totalHeight = barHeight + (state.columns - 1) * spacing;
    const startX = (width - barWidth) / 2;
    const startY = (height - totalHeight) / 2;

    const drawOrder = isReverse 
      ? Array.from({ length: state.columns }, (_, i) => state.columns - 1 - i)
      : Array.from({ length: state.columns }, (_, i) => i);

    for (const i of drawOrder) {
      const x = startX;
      const y = startY + i * spacing;
      const color = state.colors[i] || "#888888";

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, borderRadius);
      ctx.fill();
    }
  }
}
