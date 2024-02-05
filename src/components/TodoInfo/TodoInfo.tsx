import './TodoInfo.scss';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { completed, title, user } = todo;

  return (
    <article
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
