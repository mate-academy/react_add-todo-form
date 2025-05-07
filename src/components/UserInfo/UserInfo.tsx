import { User } from '../../types/User';

interface TodoProps {
  user: User;
}

export const UserInfo = ({ user }: TodoProps) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
