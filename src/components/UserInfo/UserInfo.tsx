import { User } from '../../Types/user';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (user === null) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};