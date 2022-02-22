import React from 'react';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="TodoInfo TodoInfo__wrapper">
      <div className="TodoInfo__user">
        {todo.user && <UserInfo user={todo.user} />}
      </div>

      <div className="TodoInfo__todo">
        <p className="TodoInfo__todo-title">{todo.title}</p>
        <p className="TodoInfo__todo-status">
          {todo.completed ? 'Completed' : 'Not completed'}
        </p>
      </div>
    </div>
  );
};
