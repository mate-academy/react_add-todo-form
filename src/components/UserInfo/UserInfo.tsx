import { User } from '../types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <ul className="User">
    <li className="User__user">
      {`User: ${user.name} ${user.username}`}
    </li>
    <li className="User__email">
      {`email: ${user.email}`}
    </li>
  </ul>
);
