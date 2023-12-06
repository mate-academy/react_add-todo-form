import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

type TodoInfoProps = {
  todo: Todo
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      className={classNames('todo-info', {
        'todo-info--completed': todo.completed,
      })}
      data-id={todo.id}
    >
      <h2 className="todo-info__title">
        {todo.title}
      </h2>
      {todo.user && (
        <UserInfo
          user={todo.user}
        />
      )}
    </article>
  );
};
