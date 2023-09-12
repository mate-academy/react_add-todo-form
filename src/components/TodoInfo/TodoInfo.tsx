import classNames from 'classnames';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo';

type TodoProps = {
  todo: Todo,
};

export const TodoInfo = ({ todo }: TodoProps) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
