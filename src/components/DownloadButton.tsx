import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PaletteState, Resolution } from "@/types/palette";
import { RESOLUTION_OPTIONS } from "@/types/palette";
import { drawPalette } from "@/lib/drawPalette";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";

type DownloadButtonProps = {
  state: PaletteState;
};

export function DownloadButton({ state }: DownloadButtonProps) {
  const handleDownload = (resolution: Resolution) => {
    const [widthStr, heightStr] = resolution.split("x");
    const baseWidth = parseInt(widthStr, 10);
    const baseHeight = parseInt(heightStr, 10);
    
    const scale = 2;
    const width = baseWidth * scale;
    const height = baseHeight * scale;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawPalette(ctx, width, height, state);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `palette-${resolution}@2x.png`;
      link.click();

      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" variant="default">
          <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {RESOLUTION_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleDownload(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
