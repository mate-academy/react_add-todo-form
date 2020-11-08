import React from 'react';
import uuid from 'uuid-random';
import { Todo } from '../Todo';
import { TodoListTypes } from './TodoListTypes';

import './TodoList.css';

export const TodoList = ({ todos }) => (
  <div className="todos-list">
    {todos.map(todo => (
      <Todo
        key={uuid()}
        title={todo.title}
        completed={todo.completed}
        user={todo.user}
      />
    ))}
  </div>
);

TodoList.propTypes = TodoListTypes;
