import React from 'react';
import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo">
    <p className="todo__title">{`To Do: ${todo.id}`}</p>
    <h2>{todo.title}</h2>
    <div className="todo__info">
      <p>{`User: ${todo.name}`}</p>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
    </div>
  </div>
);
