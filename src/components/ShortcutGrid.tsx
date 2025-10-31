import React from 'react';
import ShortcutIcon from './ShortcutIcon';
import { Shortcut } from '@/pages/Index';

interface ShortcutGridProps {
  shortcuts: Shortcut[];
  columns?: number;
  onEdit: (shortcut: Shortcut) => void;
  onDelete: (shortcut: Shortcut) => void;
  shortcutBackground: string;
  shortcutIconRounding: number;
}

const ShortcutGrid: React.FC<ShortcutGridProps> = ({ shortcuts, columns = 5, onEdit, onDelete, shortcutBackground, shortcutIconRounding }) => {
  const sortedShortcuts = React.useMemo(
    () => [...shortcuts].sort((a, b) => a.position - b.position),
    [shortcuts]
  );

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {sortedShortcuts.map((shortcut) => (
        <ShortcutIcon
          key={shortcut.id}
          shortcut={shortcut}
          onEdit={() => onEdit(shortcut)}
          onDelete={() => onDelete(shortcut)}
          backgroundColor={shortcutBackground}
          shortcutIconRounding={shortcutIconRounding}
        />
      ))}
    </div>
  );
};

export default ShortcutGrid;