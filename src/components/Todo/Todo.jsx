import React from 'react';
import { TodoShape } from '../shapes/TodoShape';

export const Todo = ({ todo }) => (
  <div className="todo columns">
    <p className="column">{todo.id}</p>
    <p className="column is-half">{todo.title}</p>
    <p className="column is-one-quarter">
      {todo.user.name}
    </p>
    <label className="checkbox column">
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
      />
    </label>
  </div>
);

Todo.propTypes = TodoShape;
