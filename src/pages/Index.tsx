import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ShortcutGrid from '@/components/ShortcutGrid';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { SettingsSheet } from '@/components/SettingsSheet';
import { EditShortcutDialog } from '@/components/EditShortcutDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { WallpaperConfig } from '@/components/WallpaperSettings';
import { showError, showSuccess } from '@/utils/toast';
import { hexToRgb } from '@/lib/utils';

export interface Shortcut {
  id: string;
  name: string;
  href: string;
  iconUrl: string;
  position: number;
}

const initialShortcuts: Shortcut[] = [
  { id: '1', name: 'Google', href: 'https://google.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=google.com', position: 1 },
  { id: '2', name: 'YouTube', href: 'https://youtube.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=youtube.com', position: 2 },
  { id: '3', name: 'Facebook', href: 'https://facebook.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=facebook.com', position: 3 },
  { id: '4', name: 'GitHub', href: 'https://github.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=github.com', position: 4 },
  { id: '5', name: 'Twitter', href: 'https://twitter.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=twitter.com', position: 5 },
  { id: '6', name: 'Reddit', href: 'https://reddit.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=reddit.com', position: 6 },
  { id: '7', name: 'LinkedIn', href: 'https://linkedin.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=linkedin.com', position: 7 },
  { id: '8', name: 'Netflix', href: 'https://netflix.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=netflix.com', position: 8 },
  { id: '9', name: 'Twitch', href: 'https://twitch.tv', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=twitch.tv', position: 9 },
  { id: '10', name: 'Amazon', href: 'https://amazon.com', iconUrl: 'https://www.google.com/s2/favicons?sz=64&domain=amazon.com', position: 10 },
];

interface BingWallpaperCache {
  url: string;
  date: string;
}

const Index = () => {
  const { t } = useTranslation();
  const [logoUrl, setLogoUrl] = useLocalStorage<string>('logoUrl', '/placeholder.svg');
  const [columns, setColumns] = useLocalStorage<number>('columns', 5);
  const [shortcuts, setShortcuts] = useLocalStorage<Shortcut[]>('shortcuts', initialShortcuts);
  const [wallpaperConfig, setWallpaperConfig] = useLocalStorage<WallpaperConfig>('wallpaperConfig', { type: 'none', value: null });
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [shortcutBgColor, setShortcutBgColor] = useLocalStorage<string>('shortcutBgColor', '#ffffff');
  const [shortcutBgOpacity, setShortcutBgOpacity] = useLocalStorage<number>('shortcutBgOpacity', 0.1);
  const [shortcutIconRounding, setShortcutIconRounding] = useLocalStorage<number>('shortcutIconRounding', 0);

  const shortcutBackground = useMemo(() => {
    if (shortcutBgOpacity === 0) return 'transparent';
    const rgb = hexToRgb(shortcutBgColor);
    if (!rgb) return `rgba(255, 255, 255, ${shortcutBgOpacity})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${shortcutBgOpacity})`;
  }, [shortcutBgColor, shortcutBgOpacity]);

  useEffect(() => {
    const applyWallpaper = async () => {
      switch (wallpaperConfig.type) {
        case 'bing':
          try {
            const cacheKey = 'bingWallpaperCache';
            const cachedData = localStorage.getItem(cacheKey);
            const today = new Date().toISOString().split('T')[0];
            
            if (cachedData) {
              const parsedCache: BingWallpaperCache = JSON.parse(cachedData);
              if (parsedCache.date === today && parsedCache.url) {
                setBackgroundImage(parsedCache.url);
                return;
              }
            }

            const response = await fetch('https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=en-US');
            if (!response.ok) throw new Error('Failed to fetch Bing wallpaper');
            const data = await response.json();
            
            const newCache: BingWallpaperCache = { url: data.url, date: today };
            localStorage.setItem(cacheKey, JSON.stringify(newCache));
            setBackgroundImage(data.url);
          } catch (error) {
            console.error(error);
            showError(t('toast.wallpaper.bingError'));
            setBackgroundImage(null);
          }
          break;
        case 'url':
        case 'file':
          setBackgroundImage(wallpaperConfig.value);
          break;
        case 'none':
        default:
          setBackgroundImage(null);
          break;
      }
    };

    applyWallpaper();
  }, [wallpaperConfig, t]);

  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [deletingShortcut, setDeletingShortcut] = useState<Shortcut | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [importingSettings, setImportingSettings] = useState<object | null>(null);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const handleImportRequest = (settings: object) => {
    setImportingSettings(settings);
    setIsImportDialogOpen(true);
  };

  const confirmImport = () => {
    if (importingSettings) {
      Object.keys(importingSettings).forEach(key => {
        const value = importingSettings[key as keyof typeof importingSettings];
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      });
      setIsImportDialogOpen(false);
      setImportingSettings(null);
      showSuccess(t('toast.importSuccess'));
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleAddNew = () => {
    setEditingShortcut(null);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (shortcut: Shortcut) => {
    setEditingShortcut(shortcut);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (shortcut: Shortcut) => {
    setDeletingShortcut(shortcut);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingShortcut) {
      setShortcuts(shortcuts.filter((s) => s.id !== deletingShortcut.id));
      setIsDeleteDialogOpen(false);
      setDeletingShortcut(null);
    }
  };

  const handleSaveShortcut = (shortcutToSave: Shortcut) => {
    const exists = shortcuts.some((s) => s.id === shortcutToSave.id);
    if (exists) {
      setShortcuts(
        shortcuts.map((s) => (s.id === shortcutToSave.id ? shortcutToSave : s))
      );
    } else {
      setShortcuts([...shortcuts, shortcutToSave]);
    }
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/40 z-0" />}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <main className="flex flex-col items-center justify-center flex-grow w-full">
          <div className="mb-12">
            <img src={logoUrl} alt="Logo" className="h-24" />
          </div>
          <div className="w-full max-w-xl">
            <ShortcutGrid
              shortcuts={shortcuts}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              shortcutBackground={shortcutBackground}
              shortcutIconRounding={shortcutIconRounding}
            />
          </div>
        </main>
        <SettingsSheet
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          columns={columns}
          setColumns={setColumns}
          onAddNew={handleAddNew}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          wallpaperConfig={wallpaperConfig}
          setWallpaperConfig={setWallpaperConfig}
          shortcutBgColor={shortcutBgColor}
          setShortcutBgColor={setShortcutBgColor}
          shortcutBgOpacity={shortcutBgOpacity}
          setShortcutBgOpacity={setShortcutBgOpacity}
          shortcutBackground={shortcutBackground}
          shortcutIconRounding={shortcutIconRounding}
          setShortcutIconRounding={setShortcutIconRounding}
          onImport={handleImportRequest}
        />
        <EditShortcutDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          shortcut={editingShortcut}
          onSave={handleSaveShortcut}
          shortcutCount={shortcuts.length}
        />
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('dialog.delete.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('dialog.delete.description', { shortcutName: deletingShortcut?.name })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>{t('common.delete')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('dialog.import.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('dialog.import.description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmImport}>{t('settings.data.import')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Index;