import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <ul className="User">
    <li className="User__item">
      {`For ${user.name} `}
      <span className="User__username">{user.username}</span>
    </li>
    <li className="User__item">{user.email}</li>
  </ul>
);
