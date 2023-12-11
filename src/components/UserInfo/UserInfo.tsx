import { User } from '../../types/user';

interface Userinfo {
  user: User
}

export const UserInfo = ({ user }: Userinfo) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
