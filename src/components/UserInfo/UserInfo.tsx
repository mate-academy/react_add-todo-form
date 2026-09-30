import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <a href={`mailto:${user.email}`} className="UserInfo">
      {user.name}
    </a>
  );
};
