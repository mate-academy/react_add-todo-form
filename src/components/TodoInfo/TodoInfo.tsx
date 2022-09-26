import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type TodoType = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoType> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <>
      <article
        data-id={todo.id}
        className={classNames('TodoInfo', {
          'TodoInfo--completed': completed === true,
        })}
      >
        <h2 className="TodoInfo__title">{title}</h2>
        {todo.user
          ? <UserInfo user={todo.user} />
          : null}
      </article>
    </>
  );
};
