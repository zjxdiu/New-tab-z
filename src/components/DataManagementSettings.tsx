import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

interface DataManagementSettingsProps {
  onImport: (settings: object) => void;
}

const EXPORTABLE_KEYS = [
  'logoUrl',
  'columns',
  'shortcuts',
  'wallpaperConfig',
  'shortcutBgColor',
  'shortcutBgOpacity',
  'shortcutIconRounding',
  'theme',
  'i18nextLng',
  'openInNewTab',
];

export const DataManagementSettings: React.FC<DataManagementSettingsProps> = ({ onImport }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const settings: { [key: string]: any } = {};
      EXPORTABLE_KEYS.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) {
          // We need to parse everything except for strings which are already stored correctly
          try {
            settings[key] = JSON.parse(value);
          } catch {
            settings[key] = value;
          }
        }
      });

      const jsonString = JSON.stringify(settings, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `new-tab-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccess(t('toast.exportSuccess'));
    } catch (error) {
      console.error('Export failed:', error);
      showError(t('toast.exportError'));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const settings = JSON.parse(text);
        
        const importedKeys = Object.keys(settings);
        const hasRequiredKeys = EXPORTABLE_KEYS.some(key => importedKeys.includes(key));

        if (typeof settings !== 'object' || settings === null || !hasRequiredKeys) {
          throw new Error('Invalid settings file');
        }

        onImport(settings);
      } catch (error) {
        console.error('Import failed:', error);
        showError(t('toast.importErrorInvalidFile'));
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-t pt-6 grid gap-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('settings.data.title')}</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          {t('settings.data.export')}
        </Button>
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          {t('settings.data.import')}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/json"
          className="hidden"
        />
      </div>
    </div>
  );
};