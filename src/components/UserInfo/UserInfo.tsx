import type { User } from '../../api/users';

type Props = { user: User };

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};

export default UserInfo;
