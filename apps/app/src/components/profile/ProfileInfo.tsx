import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { ProfileData } from '@/lib/db/users';

function getInitials(name: string | null, email: string): string {
  if (name) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  }
  return email[0].toUpperCase();
}

interface ProfileInfoProps {
  user: ProfileData['user'];
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const displayName = user.name ?? user.email;
  const initials = getInitials(user.name, user.email);
  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">Account</h2>
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user.image ?? undefined} alt={displayName} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{displayName}</p>
          {user.name && <p className="text-sm text-muted-foreground">{user.email}</p>}
          <p className="text-xs text-muted-foreground">Member since {joinedDate}</p>
        </div>
      </div>
      {(user.hasGitHub || user.hasPassword) && (
        <div className="mt-4 flex items-center gap-2">
          {user.hasGitHub && (
            <span className="inline-flex items-center rounded-full border border-border bg-accent px-2.5 py-0.5 text-xs font-medium">
              GitHub
            </span>
          )}
          {user.hasPassword && (
            <span className="inline-flex items-center rounded-full border border-border bg-accent px-2.5 py-0.5 text-xs font-medium">
              Email
            </span>
          )}
        </div>
      )}
    </div>
  );
}
