import { User } from '../../types/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (user && (
    <a
      href={`mailto:${email}`}
      className="UserInfo"
    >
      {name}
    </a>
  ));
};
