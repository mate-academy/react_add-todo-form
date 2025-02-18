import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';
import { getUserById } from '../../services';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user ? <UserInfo user={user} /> : <p>User not found</p>}
    </article>
  );
};
