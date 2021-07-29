import React from 'react';
import propTypes from 'prop-types';
import { ToDo } from '../../types';

import { Todo } from '../Todo';
import './todolist.css';

export function TodoList({ todos }) {
  return (
    <ul className="toDoList">
      {todos.map(todo => (
        <li key={todo.id} className="toDoItem">
          <Todo
            title={todo.title}
            status={todo.completed}
            name={todo.user.name}
          />
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: propTypes.arrayOf(
    ToDo,
  ).isRequired,
};
