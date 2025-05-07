import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoProps) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    key={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
