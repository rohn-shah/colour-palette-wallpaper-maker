import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DownloadButton } from "@/components/DownloadButton";
import type { PaletteState } from "@/types/palette";
import { COLOR_PRESETS } from "@/types/palette";

type ConfigSidebarProps = {
  state: PaletteState;
  onChange: (state: PaletteState) => void;
};

export function ConfigSidebar({ state, onChange }: ConfigSidebarProps) {
  const handlePresetChange = (presetName: string) => {
    const preset = COLOR_PRESETS.find((p) => p.name === presetName);
    if (!preset) return;

    const newColors = preset.colors.slice(0, state.columns);
    onChange({
      ...state,
      bgColor: preset.bgColor,
      colors: newColors,
    });
  };

  const handleBgColorChange = (color: string) => {
    onChange({ ...state, bgColor: color });
  };

  const handleDirectionToggle = () => {
    onChange({ 
      ...state, 
      direction: state.direction === "horizontal" ? "vertical" : "horizontal" 
    });
  };

  const handleStackingToggle = () => {
    onChange({ 
      ...state, 
      stacking: state.stacking === "forward" ? "reverse" : "forward" 
    });
  };

  const handleColumnsChange = (value: string) => {
    const newColumns = parseInt(value, 10);
    const newColors = [...state.colors];

    if (newColumns > state.columns) {
      const currentPreset = findCurrentPreset(state.colors);
      
      for (let i = state.columns; i < newColumns; i++) {
        if (currentPreset && i < currentPreset.colors.length) {
          newColors.push(currentPreset.colors[i]);
        } else {
          newColors.push(state.colors[state.colors.length - 1] || "#888888");
        }
      }
    } else if (newColumns < state.columns) {
      newColors.splice(newColumns);
    }

    onChange({ ...state, columns: newColumns, colors: newColors });
  };

  const handleBarHeightChange = (value: string) => {
    const height = parseInt(value, 10);
    if (!isNaN(height) && height >= 10 && height <= 90) {
      onChange({ ...state, barHeight: height });
    }
  };

  const handleBarWidthChange = (value: string) => {
    const width = parseInt(value, 10);
    if (!isNaN(width) && width >= 5 && width <= 30) {
      onChange({ ...state, barWidth: width });
    }
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...state.colors];
    newColors[index] = color;
    onChange({ ...state, colors: newColors });
  };

  return (
    <aside className="flex h-full w-80 flex-col border-l border-border bg-card">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Presets</Label>
            <Select onValueChange={handlePresetChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a preset" />
              </SelectTrigger>
              <SelectContent>
                {COLOR_PRESETS.map((preset) => (
                  <SelectItem key={preset.name} value={preset.name}>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {preset.colors.slice(0, 5).map((color, i) => (
                          <div
                            key={i}
                            className="h-3 w-3 rounded-full border border-border/50"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span>{preset.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Background Colour</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={state.bgColor}
                onChange={(e) => handleBgColorChange(e.target.value)}
                className="h-9 w-16 cursor-pointer rounded-none border border-input bg-transparent"
              />
              <Input
                type="text"
                value={state.bgColor}
                onChange={(e) => handleBgColorChange(e.target.value)}
                className="flex-1"
                placeholder="#000000"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Direction</Label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDirectionToggle}
                className="flex h-9 w-full items-center justify-between rounded-none border border-input bg-transparent px-3 text-xs transition-colors hover:bg-muted"
              >
                <span className="capitalize">{state.direction}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-muted-foreground"
                >
                  {state.direction === "horizontal" ? (
                    <path
                      d="M2 8h12M10 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M8 2v12M4 10l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Stacking</Label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleStackingToggle}
                className="flex h-9 w-full items-center justify-between rounded-none border border-input bg-transparent px-3 text-xs transition-colors hover:bg-muted"
              >
                <span>
                  {state.direction === "horizontal"
                    ? state.stacking === "forward"
                      ? "Left to Right"
                      : "Right to Left"
                    : state.stacking === "forward"
                    ? "Top to Bottom"
                    : "Bottom to Top"}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-muted-foreground"
                >
                  {state.direction === "horizontal" ? (
                    state.stacking === "forward" ? (
                      <path
                        d="M2 8h12M10 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path
                        d="M14 8H2M6 4L2 8l4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )
                  ) : state.stacking === "forward" ? (
                    <path
                      d="M8 2v12M4 10l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M8 14V2M4 6l4-4 4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Number of Columns</Label>
            <Select value={String(state.columns)} onValueChange={handleColumnsChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 3).map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} Columns
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              {state.direction === "horizontal" ? "Width" : "Height"}
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="30"
                value={state.barWidth}
                onChange={(e) => handleBarWidthChange(e.target.value)}
                className="flex-1 cursor-pointer"
              />
              <Input
                type="number"
                min="5"
                max="30"
                value={state.barWidth}
                onChange={(e) => handleBarWidthChange(e.target.value)}
                className="w-16"
              />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              {state.direction === "horizontal" ? "Height" : "Width"}
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="90"
                value={state.barHeight}
                onChange={(e) => handleBarHeightChange(e.target.value)}
                className="flex-1 cursor-pointer"
              />
              <Input
                type="number"
                min="10"
                max="90"
                value={state.barHeight}
                onChange={(e) => handleBarHeightChange(e.target.value)}
                className="w-16"
              />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Column Colours</Label>
            <div className="space-y-3">
              {state.colors.map((color, index) => (
                <div key={`color-${color}-${index}`} className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Column {index + 1}
                  </Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="h-9 w-16 cursor-pointer rounded-none border border-input bg-transparent"
                    />
                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-6">
        <DownloadButton state={state} />
      </div>
    </aside>
  );
}

function findCurrentPreset(colors: string[]): ColorPreset | null {
  for (const preset of COLOR_PRESETS) {
    const matches = colors.every((color, index) => 
      index >= preset.colors.length || preset.colors[index] === color
    );
    if (matches) return preset;
  }
  return null;
}

function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 20;
  const lightness = Math.floor(Math.random() * 30) + 40;
  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
