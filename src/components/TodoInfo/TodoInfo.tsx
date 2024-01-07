import { UserInfo } from '../UserInfo';
import { Todo } from '../types';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo  ${todo.completed ? 'TodoInfo--completed' : ''}`}
    key={todo.id}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    <UserInfo userId={todo.userId} />
  </article>
);
