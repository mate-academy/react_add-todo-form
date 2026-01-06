import { Users } from '../../types/Users';

export const UserInfo = ({ user }: { user: Users }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
