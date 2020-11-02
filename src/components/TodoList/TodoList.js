import React from 'react';
import { TodoListShape } from '../../shapes/TodoListShape';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <table className="todo__list">
    <thead>
      <tr>
        <th>task</th>
        <th>user</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id}>
          <Todo {...todo} />
        </tr>
      ))}
    </tbody>
  </table>

);

TodoList.propTypes = TodoListShape;
