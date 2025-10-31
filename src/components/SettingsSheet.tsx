import React from 'react';
import { Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { WallpaperSettings, WallpaperConfig } from './WallpaperSettings';
import { ShortcutAppearanceSettings } from './ShortcutAppearanceSettings';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ThemeToggle } from './ThemeToggle';
import { Shortcut } from '@/pages/Index';

interface SettingsSheetProps {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  columns: number;
  setColumns: (cols: number) => void;
  onAddNew: () => void;
  wallpaperConfig: WallpaperConfig;
  setWallpaperConfig: (config: WallpaperConfig) => void;
  shortcutBgColor: string;
  setShortcutBgColor: (color: string) => void;
  shortcutBgOpacity: number;
  setShortcutBgOpacity: (opacity: number) => void;
  shortcutBackground: string;
  shortcuts: Shortcut[];
  setShortcuts: (shortcuts: Shortcut[]) => void;
}

export const SettingsSheet: React.FC<SettingsSheetProps> = ({
  logoUrl,
  setLogoUrl,
  columns,
  setColumns,
  onAddNew,
  wallpaperConfig,
  setWallpaperConfig,
  shortcutBgColor,
  setShortcutBgColor,
  shortcutBgOpacity,
  setShortcutBgOpacity,
  shortcutBackground,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 rounded-full shadow-lg"
          style={{ backgroundColor: shortcutBackground }}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6 grid gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">General</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo-url" className="text-right col-span-1">
                  Logo URL
                </Label>
                <Input
                  id="logo-url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <ThemeToggle />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Shortcuts</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="columns" className="text-right col-span-1">
                  Columns
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <Slider
                    id="columns"
                    min={2}
                    max={10}
                    step={1}
                    value={[columns]}
                    onValueChange={(value) => setColumns(value[0])}
                  />
                  <span className="text-sm text-muted-foreground w-8 text-center">{columns}</span>
                </div>
              </div>
              <Button variant="outline" onClick={onAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Shortcut
              </Button>
            </div>
          </div>

          <ShortcutAppearanceSettings
            bgColor={shortcutBgColor}
            setBgColor={setShortcutBgColor}
            bgOpacity={shortcutBgOpacity}
            setBgOpacity={setShortcutBgOpacity}
          />

          <WallpaperSettings
            wallpaperConfig={wallpaperConfig}
            setWallpaperConfig={setWallpaperConfig}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};