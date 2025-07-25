import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const UserInfo: React.FC<Props> = ({ todo }) => {
  const user = todo.user;

  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
