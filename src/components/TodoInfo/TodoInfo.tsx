import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoPrepared } from '../../types/TodoPrepared';

import './TodoInfo.scss';

export const TodoInfo: React.FC<TodoPrepared> = ({ title, completed, user }) => {
  const status = completed ? 'Completed' : 'Is not completed';

  return (
    <>
      <div className="todoList__info">
        <h2 className="todoList__title">
          {`Task: ${title}`}
        </h2>
        <div className={classNames('todoList__status',
          {
            todoList__status__completed: completed,
          })}
        >
          {status}
        </div>
      </div>
      {user && (
        <div className="todoList__userInfo">
          <UserInfo {...user} />
        </div>
      )}
    </>
  );
};
