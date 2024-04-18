import { TodoInfoProps } from '../../types/TodoInfo';
import { UserInfo } from '../UserInfo';

import cn from 'classnames';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
