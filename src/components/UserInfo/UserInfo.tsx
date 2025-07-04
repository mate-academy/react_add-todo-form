import { User } from '../../api/users';

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
