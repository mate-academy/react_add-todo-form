import React from 'react';

import './TodoInfo.scss';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div key={todo.id} className="todo">
    <UserInfo user={todo.user} />
    <div className="todo_title">{`Todo: ${todo.title}`}</div>
    {todo.completed
      ? <span className="todo_completed">Completed</span>
      : <span className="todo_completed">Not completed</span>}
  </div>
);
