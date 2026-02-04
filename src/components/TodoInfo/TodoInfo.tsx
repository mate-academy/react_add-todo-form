import { Todo } from '../../api/types';
import { UserInfo } from '../UserInfo';

type TodoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <article
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user != null && <UserInfo user={todo.user} />}
    </article>
  );
};
