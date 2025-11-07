import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
import { LanguageSelector } from './LanguageSelector';
import { DataManagementSettings } from './DataManagementSettings';
import { Switch } from '@/components/ui/switch';

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
  shortcutIconRounding: number;
  setShortcutIconRounding: (rounding: number) => void;
  shortcutBgRounding: number;
  setShortcutBgRounding: (rounding: number) => void;
  openInNewTab: boolean;
  setOpenInNewTab: (open: boolean) => void;
  connectedShortcutBackground: boolean;
  setConnectedShortcutBackground: (connected: boolean) => void;
  onImport: (settings: object) => void;
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
  setBgColor: setShortcutBgColor, // Renamed for clarity with ShortcutAppearanceSettings
  shortcutBgOpacity,
  setBgOpacity: setShortcutBgOpacity, // Renamed for clarity with ShortcutAppearanceSettings
  shortcutBackground,
  shortcutIconRounding,
  setShortcutIconRounding,
  shortcutBgRounding,
  setShortcutBgRounding,
  openInNewTab,
  setOpenInNewTab,
  connectedShortcutBackground,
  setConnectedShortcutBackground,
  onImport,
}) => {
  const { t } = useTranslation();
  const settingsButtonBorderRadius = useMemo(() => {
    const maxRadius = 20; // half of width/height (40px for size="icon")
    const radius = maxRadius * (shortcutBgRounding / 100);
    return `${radius}px`;
  }, [shortcutBgRounding]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 shadow-lg"
          style={{ backgroundColor: shortcutBackground, borderRadius: settingsButtonBorderRadius }}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t('settings.title')}</SheetTitle>
        </SheetHeader>
        <div className="py-6 grid gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{t('settings.general.title')}</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo-url" className="text-right col-span-1">
                  {t('settings.general.logoUrl')}
                </Label>
                <Input
                  id="logo-url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{t('settings.shortcuts.title')}</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="columns" className="text-right col-span-1">
                  {t('settings.shortcuts.columns')}
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
              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor="open-in-new-tab" className="pr-2">
                  {t('settings.shortcuts.openInNewTab')}
                </Label>
                <Switch
                  id="open-in-new-tab"
                  checked={openInNewTab}
                  onCheckedChange={setOpenInNewTab}
                />
              </div>
              <Button variant="outline" onClick={onAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                {t('settings.shortcuts.addNew')}
              </Button>
            </div>
          </div>

          <ShortcutAppearanceSettings
            bgColor={shortcutBgColor}
            setBgColor={setShortcutBgColor}
            bgOpacity={shortcutBgOpacity}
            setBgOpacity={setShortcutBgOpacity}
            shortcutIconRounding={shortcutIconRounding}
            setShortcutIconRounding={setShortcutIconRounding}
            shortcutBgRounding={shortcutBgRounding}
            setShortcutBgRounding={setShortcutBgRounding}
            connectedShortcutBackground={connectedShortcutBackground}
            setConnectedShortcutBackground={setConnectedShortcutBackground}
          />

          <WallpaperSettings
            wallpaperConfig={wallpaperConfig}
            setWallpaperConfig={setWallpaperConfig}
          />

          <DataManagementSettings onImport={onImport} />
        </div>
      </SheetContent>
    </Sheet>
  );
};