import { FC } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: FC<Props> = (props) => {
  const {
    id,
    title,
    completed,
    user,
  } = props.todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo box', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
