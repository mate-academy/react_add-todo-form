import type { User } from '../../types';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <a href={`mailto:${user.email}`} className="UserInfo">
      {user.name}
    </a>
  );
};
