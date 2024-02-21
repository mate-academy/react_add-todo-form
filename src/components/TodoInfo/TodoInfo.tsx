import cn from 'classnames';
import { Todo } from '../Types/types';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
