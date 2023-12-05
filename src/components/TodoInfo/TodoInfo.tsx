import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/todo';

interface Props {
  todo: Todo;
}
export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2
      className="TodoInfo__title"
    >
      {todo.title}
    </h2>
    <UserInfo
      user={todo.user}
    />
  </article>
);
