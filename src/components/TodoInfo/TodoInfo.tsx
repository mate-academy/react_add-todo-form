import cn from 'classnames';

import { UserInfo } from '../UserInfo/UserInfo';
import { TodoWithUser } from '../../types/types';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed === true,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} /> }

  </article>
);
