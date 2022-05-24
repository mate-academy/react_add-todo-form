import { User } from '../../types/user';
import './UserInfo.scss';

type Props = Omit<User, 'id'>;

export const UserInfo: React.FC<Props> = ({ name, email }) => {
  return (
    <ul className="user-info">
      <li>{name}</li>
      {' '}
      <li><a href="mailto:{mail}">{email}</a></li>
    </ul>
  );
};
