import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/TodosProps';

type TodoInfoProps = {
  todo: Todo
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">
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
