import { User } from '../../types/User';

interface Props {
  user: User
}

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
