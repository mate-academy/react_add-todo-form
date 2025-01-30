import classNames from 'classnames';
import { Todo } from '../../App';

interface TodoInfoProps {
  todo: Todo;
}
export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const todoClass = classNames({
    TodoInfo: true,
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article data-id={todo.id} className={todoClass}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
        {todo.user?.name}
      </a>
    </article>
  );
};
