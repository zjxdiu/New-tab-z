import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface ShortcutAppearanceSettingsProps {
  bgColor: string;
  setBgColor: (color: string) => void;
  bgOpacity: number;
  setBgOpacity: (opacity: number) => void;
}

export const ShortcutAppearanceSettings: React.FC<ShortcutAppearanceSettingsProps> = ({
  bgColor,
  setBgColor,
  bgOpacity,
  setBgOpacity,
}) => {
  return (
    <div className="border-t pt-6 grid gap-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Shortcut Appearance</h3>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right col-span-1">Style</Label>
        <div className="col-span-3 flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-8 rounded-md border p-0"
                style={{ backgroundColor: bgColor }}
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer p-1"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 w-24"
                  placeholder="#ffffff"
                />
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex-1 flex items-center gap-2">
            <Slider
              min={0}
              max={1}
              step={0.05}
              value={[bgOpacity]}
              onValueChange={(value) => setBgOpacity(value[0])}
            />
            <span className="text-sm text-muted-foreground w-10 text-center">
              {Math.round(bgOpacity * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};