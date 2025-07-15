import { User } from '../../types/User';

export const UserInfo = ({ user }: { user: User | undefined }) => (
  <a className="UserInfo " href={`mailto:${user?.email}`}>
    <i>{user?.name}</i>
  </a>
);
