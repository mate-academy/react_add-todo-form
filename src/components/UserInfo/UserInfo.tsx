import { User } from '../../types/User';
import './UserInfo.scss';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <>
    <h3 className="user__name">{name}</h3>
    <p className="user__email">{email}</p>
  </>
);
