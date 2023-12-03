import { UserInfoType } from '../types/UserAndTodo';

export const UserInfo: React.FC<UserInfoType> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
