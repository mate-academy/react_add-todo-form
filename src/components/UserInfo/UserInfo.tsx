import { User } from '../../types/user';
import './UserInfo.css';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <div className="user">
    <p className="user__name">
      {name}
    </p>
    <p className="user__email">
      {email}
    </p>
  </div>
);
