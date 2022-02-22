import './UserInfo.scss';
import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({
  name, email,
}) => (
  <div className="user">
    <h2 className="user__name">{name}</h2>
    <div className="user__email">{email}</div>
  </div>
);
