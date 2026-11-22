import { User } from '../../types/Users';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <a href={`mailto:${user.email}`} className="UserInfo text-blue-500">
      {user.name}
    </a>
  );
};
