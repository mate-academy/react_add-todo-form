import { UsersItem } from '../../types/UsersItem';

interface UserInfoProps {
  user: UsersItem | undefined;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </>
  );
};
