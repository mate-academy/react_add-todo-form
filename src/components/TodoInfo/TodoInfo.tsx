import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import userFromServer from '../../api/users';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const currentUser = userFromServer.find(elem => elem.id == todo.userId);

  if (!currentUser) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={currentUser} />
    </article>
  );
};
