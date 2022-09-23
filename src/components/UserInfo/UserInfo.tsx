import { User } from '../../react-app-env';

type Props = {
  user: User | null
};

export const UserInfo: React.FC<Props> = (user) => {
  return (
    <a className="UserInfo" href={user.user?.email}>
      {user.user?.name}
    </a>
  );
};
