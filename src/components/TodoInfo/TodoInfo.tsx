import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

interface TodoInfoProps {
  todo: Todo,
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      className={`TodoInfo TodoInfo${completed && '--completed'}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
