import React from 'react';
import { Todo } from '../types/Types';
import './TodoList.scss';

interface Props {
  renderedTodos: Todo[],
}

export const TodoList: React.FC<Props> = ({ renderedTodos }) => (
  <ul className="List">
    {renderedTodos.map(todo => (
      <li key={todo.id} className="List__item">
        <div className="List__item--title">{`${todo.id}. ${todo.title}`}</div>
        <div>{todo.user && `Assigned to: ${todo.user.name} (userID: ${todo.userId})`}</div>
      </li>
    ))}
  </ul>
);
