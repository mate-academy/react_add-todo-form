import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

export const TodoInfo:React.FC<Todo> = ({ title, completed, user }) => (
  <>
    {user && (
      <div className="div">
        <UserInfo
          {...user}
        />
      </div>
    )}
    <div className="todo_info">
      <h1 className="todo_info__title">{title}</h1>
      <div className="todo_info__completed">
        {completed
          ? 'completed'
          : 'not completed'}
      </div>
    </div>
  </>
);
