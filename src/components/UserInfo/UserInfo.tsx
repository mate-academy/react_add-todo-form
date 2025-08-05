import { Todo } from '../TodoInfo/Todo';

export const UserInfo = ({ user }: Pick<Todo, 'user'>) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
