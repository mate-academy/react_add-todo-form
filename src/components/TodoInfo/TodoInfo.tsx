import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}
export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    data-id={todo.id}
    key={todo.id}
    className={`${todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
