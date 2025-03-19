import { Todo } from '../../types/Todos';
import { UserInfo } from '../UserInfo';

type Prop = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Prop) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
