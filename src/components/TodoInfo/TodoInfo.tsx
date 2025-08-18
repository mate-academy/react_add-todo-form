import classNames from 'classnames';
import { PreparedTodo } from '../../types/PreparedTodo';
import { UserInfo } from '../UserInfo';

type Todo = {
  todo: PreparedTodo;
};

export const TodoInfo: React.FC<Todo> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
