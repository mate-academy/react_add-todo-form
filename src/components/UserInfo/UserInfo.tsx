import { User } from '../../services/User';

export const UserInfo = ({ user }: { user: User }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name} ({user.username})
  </a>
);
