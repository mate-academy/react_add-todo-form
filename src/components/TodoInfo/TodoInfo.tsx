import classes from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const isComplited = todo.completed;
  const className = classes({
    TodoInfo: true,
    'TodoInfo--completed': isComplited,
  });

  return (
    <article className={className}
    data-id={todo.id}
    key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
