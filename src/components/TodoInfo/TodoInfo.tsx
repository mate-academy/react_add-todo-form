import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoListProps {
  todo: Todo,
}

export const TodoInfo: React.FC<TodoListProps> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
      data-id={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (<UserInfo user={user} />)}
    </article>
  );
};
