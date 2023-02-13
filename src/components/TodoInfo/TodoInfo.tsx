import React from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (

    <li
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': completed })}
      key={todo.id}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      { user
      && <UserInfo name={user.name} email={user.email} />}

    </li>
  );
};
