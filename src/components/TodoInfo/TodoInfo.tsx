import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type TodoProps = {
  todo: Todo;
};
export const TodoInfo = ({ todo }: TodoProps) => {
  const todoStyle = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article data-id={todo.id} className={todoStyle}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
