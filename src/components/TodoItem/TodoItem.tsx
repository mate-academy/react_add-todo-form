import React from 'react';
import './TodoItem.css';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div className="TodoItem">
      <h3 className="TodoItem__name">{todo.user?.name}</h3>
      <p className="TodoItem__title">
        {todo.title}
      </p>
      <a href={`mailto:${todo.user?.email}`} className="TodoItem__email">{todo.user?.email}</a>
    </div>
  );
};
