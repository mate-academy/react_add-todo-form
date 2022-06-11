import React from 'react';
import { Todo } from '../Types/Types';
import './TodoCard.scss';

type Props = {
  todo: Todo
};

export const TodoCard:React.FC<Props> = ({ todo }) => {
  return (
    <li className="item">
      <h2 className="item__title">{todo.title}</h2>
      <div className="item__user-container">
        <h3 className="item__user-name">{todo.user.name}</h3>
        <h3 className="item__user-name">{todo.user.username}</h3>
        <h3 className="item__email">{todo.user.email}</h3>
      </div>
      <h3 className="item__status">
        Status:
        {todo.completed ? ' done' : ' not complete'}
      </h3>
    </li>
  );
};
