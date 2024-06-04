import { UserProps } from '../../types/UserProps';

interface UserInfoProps {
  user: UserProps | undefined;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  if (!user) {
    return;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
