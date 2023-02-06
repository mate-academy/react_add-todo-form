import { FC } from 'react';
import classNames from 'classnames';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo: FC<Todo> = ({
  id,
  title,
  userId,
  completed,
}) => {
  const todoInfoClassNames = classNames('TodoInfo', {
    'TodoInfo--completed': completed,
  });

  const user = usersFromServer.find(item => item.id === userId);

  return (
    <article
      data-id={id}
      className={todoInfoClassNames}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo
          name={user.name}
          email={user.email}
        />
      )}
    </article>
  );
};
