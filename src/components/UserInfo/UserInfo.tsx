import { User } from '../../types';

type UserInfoProps = {
  user?: User,
};

export const UserInfo = ({ user }: UserInfoProps) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
