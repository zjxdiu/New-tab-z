import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="theme" className="text-right col-span-1">
        {t('settings.general.theme.title')}
      </Label>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="col-span-3" id="theme">
          <SelectValue placeholder={t('settings.general.theme.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">{t('settings.general.theme.light')}</SelectItem>
          <SelectItem value="dark">{t('settings.general.theme.dark')}</SelectItem>
          <SelectItem value="system">{t('settings.general.theme.system')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};