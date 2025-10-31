import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Shortcut } from '@/pages/Index';

interface ShortcutIconProps {
  shortcut: Shortcut;
  onEdit: () => void;
  onDelete: () => void;
  backgroundColor: string;
}

const ShortcutIcon: React.FC<ShortcutIconProps> = ({ shortcut, onEdit, onDelete, backgroundColor }) => {
  const { href, iconUrl, name } = shortcut;
  return (
    <div className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-2 rounded-lg transition-all group"
        style={{ backgroundColor }}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-gray-200/50 dark:bg-gray-700/50 rounded-full mb-2 group-hover:shadow-md transition-shadow">
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
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ShortcutIcon;