import { Users } from '../../types/Users';

export const UserInfo = ({ user }: { user: Users }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
