import './UserInfo.scss';
import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user: { email, name } }) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
