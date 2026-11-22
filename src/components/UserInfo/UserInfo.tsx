import { User } from '../../types/Users';

type Props = {
  user: User | null;
};

export const UserInfo = ({ user }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <a href={`mailto:${user.email}`} className="UserInfo text-blue-500">
      {user.name}
    </a>
  );
};
