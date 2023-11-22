import { User } from '../../types/user';

export const UserInfo = ({ user }: { user: User | null }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {`${user?.name}`}
  </a>
);
