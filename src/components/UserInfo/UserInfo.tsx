import type { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
