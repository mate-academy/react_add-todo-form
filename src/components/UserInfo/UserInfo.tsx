import { User } from '../../types/user';
import './UserInfo.scss';

type Props = User;

export const UserInfo: React.FC<Props> = ({ name, email }) => {
  return (
    <ul className="user-info">
      <li>{name}</li>
      {' '}
      <li><a href="mailto:{mail}">{email}</a></li>
    </ul>
  );
};
