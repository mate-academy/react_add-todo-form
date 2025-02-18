import { TodoWithUser } from '../../App';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{ todo: TodoWithUser }> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {!!todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
