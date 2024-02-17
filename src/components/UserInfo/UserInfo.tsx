import { User } from '../../Types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
