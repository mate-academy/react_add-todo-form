import { Todo } from '../types/Todo';

export const UserInfo: React.FC<{ user: Todo['user'] }> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
