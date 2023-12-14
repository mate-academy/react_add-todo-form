import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

// Add the required types and props
type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const classes = todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo';

  return (
    <article className={classes} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
