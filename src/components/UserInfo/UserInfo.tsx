// Add the required types and props
import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a
    className="UserInfo"
    href={`mailto:${user.email}`}
    data-id={user.id}
  >
    {user.name}
  </a>
);
