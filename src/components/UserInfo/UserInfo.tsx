import { User } from '../../types/User';

type Props = {
  user: User | undefined;
};

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
