import React from 'react';
import { PreparedTodos } from '../../types/PreparedTodos';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: PreparedTodos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="Todo_info">
    {todo.title && <h3 className="Todo_info__title">{todo.title}</h3>}
    {todo.completed
      ? <p className="Todo_info--completed">Completed</p>
      : <p className="Todo_info--not-completed">Not completed</p>}
    {todo.user ? <UserInfo user={todo.user} /> : 'User not found'}
  </div>
);
