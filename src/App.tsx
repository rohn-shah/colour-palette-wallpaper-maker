import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WallpaperCanvas } from "@/components/WallpaperCanvas";
import { ConfigSidebar } from "@/components/ConfigSidebar";
import { DEFAULT_PALETTE } from "@/types/palette";
import type { PaletteState } from "@/types/palette";

export function App() {
  const [paletteState, setPaletteState] = useState<PaletteState>(DEFAULT_PALETTE);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <WallpaperCanvas state={paletteState} />
        </div>
        <ConfigSidebar state={paletteState} onChange={setPaletteState} />
      </div>
    </div>
  );
}

export default App;