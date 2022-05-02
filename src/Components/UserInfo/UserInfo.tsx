import { User } from '../../Types/User';
import './UserInfo.scss';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <div className="user">
    <h4 className="user__name">{name}</h4>
    <h5 className="user__email">{email}</h5>
  </div>
);
