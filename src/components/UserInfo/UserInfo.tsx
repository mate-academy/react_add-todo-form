import { User } from '../../types/User';

interface Props {
  user: User | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user?.email}`}
      key={user?.id}
    >
      {user?.name}
    </a>
  );
};
