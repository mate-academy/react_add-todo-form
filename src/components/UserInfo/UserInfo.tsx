import { User } from '../../types/user';

type UserProp = {
  user: User
}

export const UserInfo: React.FC<UserProp> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
