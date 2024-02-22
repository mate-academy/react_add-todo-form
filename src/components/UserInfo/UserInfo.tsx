import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const mailLink = `mailto:${user.email}`;

  return (
    <a className="UserInfo" href={mailLink}>
      {user.name}
    </a>
  );
};
