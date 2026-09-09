import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo = (props: Props) => {
  const { todo } = props;
  const completedClass = todo.completed ? ' TodoInfo--completed' : '';

  return (
    <article className={`TodoInfo${completedClass}`} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? <UserInfo user={todo.user} /> : null}
    </article>
  );
};
