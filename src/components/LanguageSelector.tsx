import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: '简体中文' },
];

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="language" className="text-right col-span-1">
        {t('settings.general.language')}
      </Label>
      <Select value={i18n.language.startsWith('zh') ? 'zh-CN' : 'en'} onValueChange={changeLanguage}>
        <SelectTrigger className="col-span-3" id="language">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};