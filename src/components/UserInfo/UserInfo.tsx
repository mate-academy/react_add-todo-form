import { User } from '../../entities/User';
import './UserInfo.scss';

interface Props {
  user?: User | null;
}

export const UserInfo = ({ user }: Props) =>
  user ? (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  ) : null;
