import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Shortcut } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface ShortcutIconProps {
  shortcut: Shortcut;
  onEdit: () => void;
  onDelete: () => void;
  backgroundColor: string;
  shortcutIconRounding: number;
  shortcutBgRounding: number;
  openInNewTab: boolean;
}

const ShortcutIcon: React.FC<ShortcutIconProps> = ({ shortcut, onEdit, onDelete, backgroundColor, shortcutIconRounding, shortcutBgRounding, openInNewTab }) => {
  const { t } = useTranslation();
  const { href, iconUrl, name } = shortcut;

  const iconBorderRadius = useMemo(() => {
    const maxRadius = 24; // half of width/height (48px)
    const radius = maxRadius * (shortcutIconRounding / 100);
    return `${radius}px`;
  }, [shortcutIconRounding]);

  const bgBorderRadius = useMemo(() => {
    const maxRadius = 16; // Corresponds to a large rounding value
    const radius = maxRadius * (shortcutBgRounding / 100);
    return `${radius}px`;
  }, [shortcutBgRounding]);

  return (
    <div className="relative">
      <a
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={cn(
          "flex flex-col items-center justify-center p-2 transition-all group",
          backgroundColor === 'transparent' ? 'hover:bg-gray-200/10 dark:hover:bg-gray-700/10' : ''
        )}
        style={{ backgroundColor, borderRadius: bgBorderRadius }}
      >
        <div
          className="w-12 h-12 flex items-center justify-center bg-gray-200/50 dark:bg-gray-700/50 mb-2 group-hover:shadow-md transition-shadow"
          style={{ borderRadius: iconBorderRadius }}
        >
          <img src={iconUrl} alt={name} className="w-8 h-8 object-contain" />
        </div>
        <span className="text-sm text-gray-800 dark:text-gray-200 truncate w-full text-center">{name}</span>
      </a>
      <div className="absolute top-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onEdit}>{t('common.edit')}</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-500">
              {t('common.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ShortcutIcon;