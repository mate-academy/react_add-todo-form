import { User } from '../../types/Users';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={user ? `mailto:${user.email}` : undefined}>
      {user ? user.name : 'Unknown User'}
    </a>
  );
};
