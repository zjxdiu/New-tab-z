import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="theme" className="text-right col-span-1">
        Theme
      </Label>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="col-span-3" id="theme">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Bright</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">Follow system</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};