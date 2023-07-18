import { User } from '../../types/User';

export const UserInfo = (
  { user }: { user: User | undefined },
) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
