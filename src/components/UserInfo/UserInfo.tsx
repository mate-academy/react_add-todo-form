import { User } from '../../types/Users';

interface Props {
  user: User,
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user.email}`}
    >
      {user.name}
    </a>
  );
};
