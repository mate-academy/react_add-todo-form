import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    user,
    title,
    completed,
  } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed === true,
        },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
