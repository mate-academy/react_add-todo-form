import { Todo } from '../../types';

export const UserInfo = ({ user }: { user: Todo['user'] }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
