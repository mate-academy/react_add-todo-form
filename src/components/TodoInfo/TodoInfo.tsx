import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/getUserById';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={getUserById(todo.userId)} />
    </article>
  );
};
