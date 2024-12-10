import { User } from '../../App';

export const UserInfo: React.FC<{ user: User | undefined | null }> = ({
  user,
}) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
