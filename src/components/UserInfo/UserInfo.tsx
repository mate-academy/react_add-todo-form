import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="User">
    <ul className="User__list">
      <li className="User__item">
        {`For ${user.name} ${user.username}`}
      </li>
      <li className="User__email">{user.email}</li>
    </ul>
  </div>
);
