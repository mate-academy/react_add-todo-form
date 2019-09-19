import React from 'react';
import './TodoList.css';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos }) => (
  <div>
    <h1>Static list of todos</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Tasks</th>
          <th scope="col">Completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  </div>
);
