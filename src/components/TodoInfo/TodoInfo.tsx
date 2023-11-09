import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const currentUser
  = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      key={todo.id}
      data-id={String(todo.id)}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {currentUser && (
        <UserInfo
          name={currentUser.name}
          email={currentUser.email}
        />
      )}
    </article>
  );
};
