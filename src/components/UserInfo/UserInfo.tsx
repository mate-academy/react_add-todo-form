import { User } from '../../types/user';

interface Props {
  user: User | null;
}

export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
