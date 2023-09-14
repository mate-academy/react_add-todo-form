import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type ToDoInfoProps = {
  todo: Todo
};

export const TodoInfo = ({ todo }: ToDoInfoProps) => {
  const className = `TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`;

  return (
    <article className={className} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user
      && <UserInfo user={todo.user} />}
    </article>
  );
};
