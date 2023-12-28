import './UserInfo.scss';
import { UserInfoProps } from '../../types/userInfo';

export const UserInfo: React.FC<UserInfoProps> = ({
  name,
  email,
}) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
