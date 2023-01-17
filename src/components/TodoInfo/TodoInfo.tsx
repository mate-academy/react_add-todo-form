import { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = memo(({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <>
      <article
        data-id={id}
        className={cn(completed
          ? 'TodoInfo TodoInfo--completed'
          : 'TodoInfo')}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user && <UserInfo user={user} />}
      </article>
    </>
  );
});
