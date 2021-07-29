import React from 'react';
import { Todo } from '../Todo/Todo';
import { FormProps } from '../TodoProps';
import './TodoList.css';

export const TodosList = ({ todos }) => (
  <ul className="container">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="card"
      >
        <Todo
          user={todo.user}
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ))}
  </ul>
);

TodosList.propTypes = FormProps;
