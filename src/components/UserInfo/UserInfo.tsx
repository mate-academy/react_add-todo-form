import { User } from '../../types/interfaces';

interface Props {
  user: User;
}

export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
