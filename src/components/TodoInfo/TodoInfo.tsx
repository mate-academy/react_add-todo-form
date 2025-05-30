import { Todo } from '../../entities/todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
