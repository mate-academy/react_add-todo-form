import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const currentUser = usersFromServer.find(user => user.id === userId) || null;

  return (
    <article
      data-id={id}
      key={id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {currentUser && (
        <UserInfo user={currentUser} />
      )}
    </article>
  );
};
