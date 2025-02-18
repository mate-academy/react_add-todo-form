import '../../App.scss';
import { User } from '../../types/UserType';

type UserInfoProps = {
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
