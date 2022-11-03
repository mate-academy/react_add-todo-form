import React from 'react';
import classNames from 'classnames';
import users from '../../api/users';
import { Todo } from '../../interface/Todo';
import { UserInfo } from '../UserInfo/index';

type Props = {
  todo: Todo,
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { title, completed, userId } = todo;
  const user = users.find(userFromList => userId === userFromList.id);

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo', {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2
        className="TodoInfo__title"
      >
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
