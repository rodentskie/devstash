'use client';

import { useState, useTransition } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { deleteAccount } from '@/actions/profile';

export function DeleteAccountDialog() {
  const [confirmation, setConfirmation] = useState('');
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(next: boolean) {
    if (!next) setConfirmation('');
    setOpen(next);
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteAccount();
      if (result.error) {
        toast.error(result.error);
        return;
      }
      await signOut({ callbackUrl: '/sign-in' });
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all your items, collections, and data. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-1 py-2">
          <label htmlFor="deleteConfirm" className="text-sm text-muted-foreground">
            Type <span className="font-mono font-medium text-foreground">delete</span> to confirm
          </label>
          <Input
            id="deleteConfirm"
            type="text"
            placeholder="delete"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            disabled={isPending}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmation !== 'delete' || isPending}
            onClick={handleDelete}
          >
            {isPending ? 'Deleting…' : 'Delete account'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
