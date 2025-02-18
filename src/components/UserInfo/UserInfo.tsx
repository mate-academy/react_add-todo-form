import { User } from '../../types/user';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);

{
  /* <a className="UserInfo" href={`mailto:${currentUser.email}`}>
  {currentUser.name}
</a>; */
}
