import { User } from '../../types/User';

// Add the required props
type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
