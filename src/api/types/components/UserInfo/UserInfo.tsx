import { User } from '../../User';
import './UserInfo.scss';

type Props = User;

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <div className="user">
    <p className="user__name">
      Name:
      {' '}
      <span className="user__message">
        {name}
      </span>
    </p>
    <p className="user__email">
      E-mail:
      {' '}
      <span className="user__message">
        {email}
      </span>
    </p>
  </div>

);
