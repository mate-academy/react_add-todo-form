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
    {todo.completed
      ? <span className="todo__completed">Completed</span>
      : <span className="todo__completed">Not completed</span>}
  </div>
);
