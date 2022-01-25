import React from 'react';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <li key={todo.id} className="todoList__item">
      <h3 className="todoList__title">{todo.title}</h3>
      <UserInfo user={todo.user} />
      <p className="todoList__status">{todo.completed ? 'Completed' : 'Not Completed'}</p>
    </li>
  );
};
