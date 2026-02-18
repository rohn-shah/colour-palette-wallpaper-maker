export type PaletteState = {
  bgColor: string;
  columns: number;
  colors: string[];
  barHeight: number;
  barWidth: number;
  direction: "horizontal" | "vertical";
  stacking: "forward" | "reverse";
};

export type ColorPreset = {
  name: string;
  colors: string[];
  bgColor: string;
};

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "Muted Earth",
    colors: ["#8b6f47", "#a8896b", "#c9a889", "#dcb49a", "#f4d4c4", "#e8d5c4", "#b9a88f", "#998676", "#7a6a5e", "#6b5d52", "#5c4f43", "#4d4035"],
    bgColor: "#1a1a1a",
  },
  {
    name: "Ocean Breeze",
    colors: ["#0a2540", "#0d3b66", "#1a5490", "#2176ae", "#3a9fbf", "#57b8d8", "#6ab5d0", "#9dcee2", "#b8dce8", "#c8e0f4", "#d8eaf7", "#e8f4fb"],
    bgColor: "#0a1929",
  },
  {
    name: "Sunset Vibes",
    colors: ["#a4303f", "#c9485b", "#e94b3c", "#f37335", "#ff6b35", "#f7931e", "#fdc830", "#ffd75e", "#ffe17b", "#ffeb9c", "#fff4bd", "#fffbde"],
    bgColor: "#1a0f0f",
  },
  {
    name: "Forest Dream",
    colors: ["#0f3d1f", "#1a4d2e", "#2d6a4f", "#40916c", "#52b788", "#66c797", "#74c69d", "#95d5b2", "#a8ddbf", "#b7e4c7", "#caecd3", "#ddf3e4"],
    bgColor: "#0f1a13",
  },
  {
    name: "Lavender Fields",
    colors: ["#4d3870", "#6b4ba1", "#8b68bb", "#a888d4", "#c4a8eb", "#d0b8ed", "#d4bbf0", "#e4d4f4", "#ebdff7", "#f4ebf9", "#f8f3fb", "#fdfbfe"],
    bgColor: "#1a0f24",
  },
  {
    name: "Monochrome",
    colors: ["#0d0d0d", "#1a1a1a", "#333333", "#4d4d4d", "#666666", "#808080", "#999999", "#b3b3b3", "#cccccc", "#d9d9d9", "#e6e6e6", "#f2f2f2"],
    bgColor: "#0a0a0a",
  },
  {
    name: "Cherry Blossom",
    colors: ["#cc5973", "#e6758e", "#ff9eb1", "#ffb3c1", "#ffc7d4", "#ffd3df", "#ffd9e3", "#ffe5ed", "#ffebf0", "#fff0f3", "#fff5f7", "#fffbfc"],
    bgColor: "#1a0f13",
  },
  {
    name: "Desert Sand",
    colors: ["#9c847a", "#b0968c", "#c9ada7", "#d4b5ad", "#dfc3b8", "#e5cdc2", "#ead2c5", "#f0dfd3", "#f3e5dc", "#f5ede2", "#f8f2ea", "#faf6f1"],
    bgColor: "#1a1614",
  },
  {
    name: "Neon Nights",
    colors: ["#ff006e", "#ff1a7f", "#fb5607", "#ff6b1a", "#ffbe0b", "#ffd93d", "#8338ec", "#9d5cff", "#3a86ff", "#5ca3ff", "#06ffa5", "#39ffbb"],
    bgColor: "#0a0a0a",
  },
  {
    name: "Arctic Frost",
    colors: ["#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#61d4e8", "#90e0ef", "#a8e6f3", "#ade8f4", "#b8ecf6", "#caf0f8", "#e0f7fc"],
    bgColor: "#0a1929",
  },
  {
    name: "Autumn Harvest",
    colors: ["#8b3a3a", "#a64545", "#d62828", "#e84a3c", "#f77f00", "#fb9224", "#fcbf49", "#fdd06e", "#eae2b7", "#c9ada7", "#a98467", "#8b6f47"],
    bgColor: "#1a1410",
  },
  {
    name: "Mint Fresh",
    colors: ["#1b4332", "#2d6a4f", "#40916c", "#52b788", "#74c69d", "#81cfaa", "#95d5b2", "#a8ddbf", "#b7e4c7", "#c7ead1", "#d8f3dc", "#e8f8e8"],
    bgColor: "#0f1a13",
  },
];

export const DEFAULT_PALETTE: PaletteState = {
  bgColor: COLOR_PRESETS[0].bgColor,
  columns: 9,
  colors: COLOR_PRESETS[0].colors,
  barHeight: 36,
  barWidth: 8,
  direction: "horizontal",
  stacking: "forward",
};

export const RESOLUTION_OPTIONS = [
  { value: "1920x1080", label: "1920×1080 (Full HD)" },
  { value: "2560x1440", label: "2560×1440 (2K)" },
  { value: "3840x2160", label: "3840×2160 (4K)" },
  { value: "1080x1920", label: "1080×1920 (Mobile)" },
] as const;

export type Resolution = (typeof RESOLUTION_OPTIONS)[number]["value"];
