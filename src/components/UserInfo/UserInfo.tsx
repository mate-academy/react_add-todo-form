import User from '../../types/User';

interface UsersInfo {
  user: User;
}

export const UserInfo = ({ user }: UsersInfo) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
