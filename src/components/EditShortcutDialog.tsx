import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Shortcut } from '@/pages/Index';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface EditShortcutDialogProps {
  shortcut: Shortcut | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (shortcut: Shortcut) => void;
  shortcutCount: number;
}

export const EditShortcutDialog: React.FC<EditShortcutDialogProps> = ({
  shortcut,
  isOpen,
  onClose,
  onSave,
  shortcutCount,
}) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    name: z.string().min(1, t('dialog.editShortcut.errors.nameRequired')),
    href: z.string().url(t('dialog.editShortcut.errors.hrefInvalid')),
    iconUrl: z.string().url(t('dialog.editShortcut.errors.iconUrlInvalid')),
    position: z.coerce.number().min(1, t('dialog.editShortcut.errors.positionInvalid')),
  });

  type ShortcutFormValues = z.infer<typeof formSchema>;

  const form = useForm<ShortcutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      href: '',
      iconUrl: '',
      position: 1,
    },
  });

  useEffect(() => {
    if (shortcut) {
      form.reset(shortcut);
    } else {
      form.reset({
        name: '',
        href: '',
        iconUrl: '',
        position: shortcutCount + 1,
      });
    }
  }, [shortcut, shortcutCount, form]);

  const handleSubmit = (values: ShortcutFormValues) => {
    onSave({
      ...values,
      id: shortcut?.id || new Date().getTime().toString(),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{shortcut ? t('dialog.editShortcut.titleEdit') : t('dialog.editShortcut.titleAdd')}</DialogTitle>
          <DialogDescription>
            {shortcut ? t('dialog.editShortcut.descriptionEdit') : t('dialog.editShortcut.descriptionAdd')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialog.editShortcut.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Google" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="href"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.url')}</FormLabel>
                  <FormControl>
                    <Input placeholder="https://google.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialog.editShortcut.iconUrl')}</FormLabel>
                  <FormControl>
                    <Input placeholder="https://google.com/favicon.ico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialog.editShortcut.position')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>
                {t('common.cancel')}
              </Button>
              <Button type="submit">{t('common.save')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};