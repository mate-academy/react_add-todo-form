import { Users } from '../../types/Users';

type Props = {
  user: Users;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user?.name}
  </a>
);
