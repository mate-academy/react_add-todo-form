import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { TodoType } from '../../types';
import { Todo } from '../Todo';

export function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className="todoList__item">
          <Todo
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};
