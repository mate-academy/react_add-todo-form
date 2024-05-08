import { ValidUser } from '../../App';

type UserInfoProps = {
  user: ValidUser;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
