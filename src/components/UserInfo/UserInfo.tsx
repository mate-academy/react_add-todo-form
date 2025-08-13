import { TodoWithUser } from '../../types/Todo';

type User = TodoWithUser['user'];

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
