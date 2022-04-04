import React from 'react';
import { PreparedTodo } from '../../types/PreparedTodo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

export const TodoInfo: React.FC<PreparedTodo> = ({ user, title, completed }) => (
  <div className="TodoInfo">
    <div className="TodoInfo__block-title">
      <span className="TodoInfo__title">{'title: '}</span>
      <span className="TodoInfo__title-todo">{title}</span>
    </div>

    {user && <UserInfo {...user} />}

    <button
      type="button"
      className={`TodoInfo__button
      ${completed ? 'TodoInfo__button--success' : 'TodoInfo__button--fail'}`}
    >
      {completed ? 'Completed' : 'No completed'}
    </button>
  </div>
);
