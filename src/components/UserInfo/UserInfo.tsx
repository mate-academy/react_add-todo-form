import { User } from '../../types/User';

type Props = {
  user: User | undefined;
};

export const UserInfo = ({ user }: Props) => {
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
