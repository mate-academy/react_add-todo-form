import { User } from '../../types/User.model';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const emailHref = `mailto:${user.email}`;

  return (
    <a className="UserInfo" href={emailHref}>
      {user.name}
    </a>
  );
};
