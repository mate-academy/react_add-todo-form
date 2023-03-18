import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type TodoType = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoType> = ({ todo }) => {
  const {
    id,
    title,
    user,
    completed,
  } = todo;

  const todoClass = classNames(
    'TodoInfo',
    { 'TodoInfo--completed': completed },
  );

  return (
    <article
      data-id={id}
      className={todoClass}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
