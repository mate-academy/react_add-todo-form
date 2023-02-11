import { User } from '../../types/User';

type Props = {
  user: User | undefined;
};

export const UserInfo:React.FC<Props> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      href={user?.email}
    >
      {user?.name}
    </a>
  );
};
