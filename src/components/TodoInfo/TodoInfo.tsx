import classNames from 'classnames';
import { Todo } from '../../types/todos';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const { title, completed, user } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
