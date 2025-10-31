import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { WallpaperSettings } from './WallpaperSettings';
import { ShortcutAppearanceSettings } from './ShortcutAppearanceSettings';
import { useWallpaperSettings } from '@/hooks/useWallpaperSettings';
import { useShortcutAppearanceSettings } from '@/hooks/useShortcutAppearanceSettings';

export const SettingsSheet: React.FC = () => {
  const {
    wallpaperSource,
    setWallpaperSource,
    customWallpaperUrl,
    setCustomWallpaperUrl,
    uploadedWallpaperFile,
    setUploadedWallpaperFile,
    bingWallpaperCache,
    setBingWallpaperCache,
  } = useWallpaperSettings();

  const {
    shortcutBgColor,
    setShortcutBgColor,
    shortcutBgOpacity,
    setShortcutBgOpacity,
  } = useShortcutAppearanceSettings();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 rounded-full shadow-lg" // Changed from bottom-4 to top-4
          style={{
            backgroundColor: `rgba(${parseInt(shortcutBgColor.slice(1, 3), 16)}, ${parseInt(shortcutBgColor.slice(3, 5), 16)}, ${parseInt(shortcutBgColor.slice(5, 7), 16)}, ${shortcutBgOpacity})`,
          }}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <WallpaperSettings
            wallpaperSource={wallpaperSource}
            setWallpaperSource={setWallpaperSource}
            customWallpaperUrl={customWallpaperUrl}
            setCustomWallpaperUrl={setCustomWallpaperUrl}
            uploadedWallpaperFile={uploadedWallpaperFile}
            setUploadedWallpaperFile={setUploadedWallpaperFile}
            bingWallpaperCache={bingWallpaperCache}
            setBingWallpaperCache={setBingWallpaperCache}
          />
          <Separator className="my-6" />
          <ShortcutAppearanceSettings
            bgColor={shortcutBgColor}
            setBgColor={setShortcutBgColor}
            bgOpacity={shortcutBgOpacity}
            setBgOpacity={setShortcutBgOpacity}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};