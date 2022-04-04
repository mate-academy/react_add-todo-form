import React from 'react';

import './TodoInfo.scss';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div key={todo.id} className="todo">
    <UserInfo user={todo.user} />
    <div className="todo__title">{`Todo: ${todo.title}`}</div>
    <span className="todo__completed">
      {todo.completed ? 'Completed' : 'Not completed'}
    </span>
  </div>
);
