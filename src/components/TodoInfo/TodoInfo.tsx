import type { Todo } from '../../api/todos';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
