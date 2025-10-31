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

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  href: z.string().url('Must be a valid URL.'),
  iconUrl: z.string().url('Must be a valid URL.'),
  position: z.coerce.number().min(1, 'Position must be at least 1.'),
});

type ShortcutFormValues = z.infer<typeof formSchema>;

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
          <DialogTitle>{shortcut ? 'Edit Shortcut' : 'Add Shortcut'}</DialogTitle>
          <DialogDescription>
            {shortcut ? 'Make changes to your shortcut here.' : 'Add a new shortcut to your grid.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                  <FormLabel>URL</FormLabel>
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
                  <FormLabel>Icon URL</FormLabel>
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
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};