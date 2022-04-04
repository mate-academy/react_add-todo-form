import React from 'react';

import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = ({ title, completed, user }) => {
  const isCompletedClass = completed ? 'completed' : 'not__completed';

  return (
    <div className={classNames(
      'todo',
      isCompletedClass,
    )}
    >
      <p className="todo_title">{ title }</p>
      <span>
        Is completed:
        { completed ? ' true' : ' false' }
      </span>
      {user && <UserInfo {...user} />}
    </div>
  );
};
