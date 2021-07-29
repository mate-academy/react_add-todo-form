import React from 'react';
import PropTypes from 'prop-types';
import { Todo, TypeTodo } from '../Todo';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ol className="todoList">
    {todos.map(todo => (
      <li key={todo.id} className="todoList__item">
        <Todo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ...TypeTodo,
    }),
  ).isRequired,
};
