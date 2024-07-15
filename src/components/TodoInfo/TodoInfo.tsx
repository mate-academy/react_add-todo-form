import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';

import usersFromServer from '../../api/users';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {usersFromServer
        .filter(user => user.id === todo.userId)
        .map(filteredUser => (
          <UserInfo key={filteredUser.id} user={filteredUser} />
        ))}

    </article>
  );
};
