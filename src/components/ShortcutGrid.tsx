import React from 'react';
import ShortcutIcon from './ShortcutIcon';
import { Shortcut } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface ShortcutGridProps {
  shortcuts: Shortcut[];
  columns?: number;
  onEdit: (shortcut: Shortcut) => void;
  onDelete: (shortcut: Shortcut) => void;
  shortcutBackground: string;
  shortcutIconRounding: number;
  shortcutBgRounding: number;
  openInNewTab: boolean;
  connectedShortcutBackground: boolean;
}

const ShortcutGrid: React.FC<ShortcutGridProps> = ({ 
  shortcuts, 
  columns = 5, 
  onEdit, 
  onDelete, 
  shortcutBackground, 
  shortcutIconRounding, 
  shortcutBgRounding, 
  openInNewTab,
  connectedShortcutBackground,
}) => {
  const sortedShortcuts = React.useMemo(
    () => [...shortcuts].sort((a, b) => a.position - b.position),
    [shortcuts]
  );

  const bgBorderRadius = React.useMemo(() => {
    const maxRadius = 16; // Corresponds to a large rounding value for the grid container
    const radius = maxRadius * (shortcutBgRounding / 100);
    return `${radius}px`;
  }, [shortcutBgRounding]);

  return (
    <div
      className={cn(
        "grid",
        connectedShortcutBackground ? "gap-0 p-2" : "gap-4"
      )}
      style={{ 
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        backgroundColor: connectedShortcutBackground ? shortcutBackground : 'transparent',
        borderRadius: connectedShortcutBackground ? bgBorderRadius : '0px',
      }}
    >
      {sortedShortcuts.map((shortcut) => (
        <ShortcutIcon
          key={shortcut.id}
          shortcut={shortcut}
          onEdit={() => onEdit(shortcut)}
          onDelete={() => onDelete(shortcut)}
          backgroundColor={connectedShortcutBackground ? 'transparent' : shortcutBackground}
          shortcutIconRounding={shortcutIconRounding}
          shortcutBgRounding={connectedShortcutBackground ? 0 : shortcutBgRounding}
          openInNewTab={openInNewTab}
        />
      ))}
    </div>
  );
};

export default ShortcutGrid;