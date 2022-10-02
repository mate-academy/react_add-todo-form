import { User } from '../../types/Types';

type Props = {
  user: User,
};

export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={user.email}>
    {user.name}
  </a>
);
