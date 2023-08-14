import { TodoWithUser } from '../../types/TodoWithUser';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{
  todo: TodoWithUser
}> = ({ todo }) => {
  const isCompleted = (todo.completed && ' TodoInfo--completed') || '';

  return (
    <article data-id={todo.id} className={`TodoInfo${isCompleted}`}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
