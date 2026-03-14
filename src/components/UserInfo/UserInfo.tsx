import { User } from '../../types/User';

type Props = {
  user: User | undefined;
};

export const UserInfo = ({ user }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
