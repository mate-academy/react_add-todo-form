import { User } from '../../api/types';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
