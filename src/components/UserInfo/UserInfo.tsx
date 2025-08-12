import { User } from '../../types/User';

type Props = {
  user?: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={user?.email ? `mailto:${user.email}` : '#'}>
      {user?.name || 'Unknown User'}
    </a>
  );
};
