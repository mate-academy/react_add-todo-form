import { User } from '../../types/User';

type Props = {
  user?: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      href={user ? `mailto:${user.email}` : '#'}
    >
      {user ? user.name : ''}
    </a>
  );
};
