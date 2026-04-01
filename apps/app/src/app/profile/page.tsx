import { redirect } from 'next/navigation';
import { SidebarWrapper } from '@/components/dashboard/SidebarWrapper';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm';
import { DeleteAccountDialog } from '@/components/profile/DeleteAccountDialog';
import { getProfileData } from '@/lib/db/users';

export default async function ProfilePage() {
  const data = await getProfileData();

  if (!data) {
    redirect('/sign-in');
  }

  return (
    <>
      <SidebarWrapper />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your account</p>
          </div>

          <ProfileInfo user={data.user} />
          <ProfileStats stats={data.stats} />

          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-sm font-medium text-muted-foreground">Account actions</h2>

            {data.user.hasPassword && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Change password</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Update your password to keep your account secure.
                </p>
                <ChangePasswordForm />
              </div>
            )}

            <div className="space-y-1">
              <p className="text-sm font-medium text-destructive">Danger zone</p>
              <p className="text-xs text-muted-foreground mb-3">
                Permanently delete your account and all associated data.
              </p>
              <DeleteAccountDialog />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
