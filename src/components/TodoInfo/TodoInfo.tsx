import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';
import { completeTodo } from '../../services/todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      className={`TodoInfo ${completeTodo(todo.completed)}`}
      key={todo.id}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{`${todo.title}`}</h2>
      <UserInfo user={user} />
    </article>
  );
};
