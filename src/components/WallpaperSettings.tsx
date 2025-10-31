import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showError, showSuccess } from '@/utils/toast';
import { Card, CardContent } from '@/components/ui/card';
import { Ban, Image as ImageIcon, Link, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WallpaperConfig {
  type: 'none' | 'bing' | 'url' | 'file';
  value: string | null;
}

interface WallpaperSettingsProps {
  wallpaperConfig: WallpaperConfig;
  setWallpaperConfig: (config: WallpaperConfig) => void;
}

export const WallpaperSettings: React.FC<WallpaperSettingsProps> = ({ wallpaperConfig, setWallpaperConfig }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wallpaperOptions = [
    { type: 'none', label: t('settings.wallpaper.none'), icon: Ban },
    { type: 'bing', label: t('settings.wallpaper.bing'), icon: ImageIcon },
    { type: 'url', label: t('settings.wallpaper.fromUrl'), icon: Link },
    { type: 'file', label: t('settings.wallpaper.upload'), icon: Upload },
  ] as const;

  const handleTypeChange = (type: WallpaperConfig['type']) => {
    if (type === 'url' && !wallpaperConfig.value?.startsWith('http')) {
      setWallpaperConfig({ type, value: '' });
    } else if (type !== 'url' && type !== 'file') {
      setWallpaperConfig({ type, value: null });
    } else {
      setWallpaperConfig({ ...wallpaperConfig, type });
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWallpaperConfig({ type: 'url', value: e.target.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showError(t('toast.wallpaper.uploadErrorFileSize'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setWallpaperConfig({ type: 'file', value: result });
      showSuccess(t('toast.wallpaper.uploadSuccess'));
    };
    reader.onerror = () => {
      showError(t('toast.wallpaper.uploadErrorFileRead'));
    };
    reader.readAsDataURL(file);
    event.target.value = ''; // Reset file input
  };

  return (
    <div className="border-t pt-6 grid gap-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('settings.wallpaper.title')}</h3>
      <div className="grid grid-cols-2 gap-2">
        {wallpaperOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.type}
              onClick={() => handleTypeChange(option.type)}
              className={cn(
                'cursor-pointer hover:border-primary transition-colors',
                wallpaperConfig.type === option.type && 'border-primary ring-2 ring-primary'
              )}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{option.label}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {wallpaperConfig.type === 'url' && (
        <div className="grid grid-cols-4 items-center gap-4 pt-2">
          <Label htmlFor="wallpaper-url" className="text-right col-span-1">
            {t('common.url')}
          </Label>
          <Input
            id="wallpaper-url"
            value={typeof wallpaperConfig.value === 'string' ? wallpaperConfig.value : ''}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="col-span-3"
          />
        </div>
      )}

      {wallpaperConfig.type === 'file' && (
        <div className="pt-2">
          <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
            {t('settings.wallpaper.chooseFile')}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif, image/webp"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};