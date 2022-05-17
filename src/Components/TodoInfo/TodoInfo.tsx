import React from 'react';
import './TodoInfo.scss';
import { Todo } from '../../Types/todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="todo">
      <h2 className="todo__title">
        {todo.title}
      </h2>
      <input className="todo__check" type="checkbox" checked={todo.completed} />
      {todo.user && <UserInfo user={todo.user} />}
    </div>
  );
};
