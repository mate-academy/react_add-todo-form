import { User } from '../../types/User';

type UserProps = {
  user: User;
};
export const UserInfo = ({ user }: UserProps) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
