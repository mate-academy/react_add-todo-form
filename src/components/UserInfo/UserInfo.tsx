import { User } from '../../types/User';

export const UserInfo: React.FC<{ user?: User }> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email || ''}`}>
    {user ? user.name : 'Unknown User'}
  </a>
);
