import React from 'react';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';

export const TodoInfo:React.FC<PreparedTodo> = ({
  title,
  completed,
  user,
}) => (
  <div className="todo">
    <h3 className="todo__title">
      {title}
    </h3>

    <p className="todo__uncompleted">
      {completed
        ? 'Completed'
        : 'Not completed'}
    </p>

    {user && <UserInfo user={user} />}
  </div>
);
