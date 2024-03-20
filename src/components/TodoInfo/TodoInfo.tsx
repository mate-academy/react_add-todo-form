import cn from 'classnames';

import { Todos } from '../../types/todos';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title" data-cy="titleInput">
        {todo.title}
      </h2>

      <UserInfo />
    </article>
  );
};
