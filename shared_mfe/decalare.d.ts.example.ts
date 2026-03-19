declare module "shared/ProfilePage" {
  const ProfilePage: React.FC;
  export default ProfilePage;
}

declare module "shared/SettingsPage" {
  const SettingsPage: React.FC;
  export default SettingsPage;
}

declare module "shared/Avatar" {
  export interface AvatarProps {
    name: string;
    size?: "sm" | "md" | "lg";
  }
  const Avatar: React.FC<AvatarProps>;
  export default Avatar;
}

declare module "shared/useProfile" {
  export const useProfile: () => {
    user: { name: string; email: string; role: string } | null;
    loading: boolean;
  };
}
