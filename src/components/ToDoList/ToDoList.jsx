import React from 'react';
import PropTypes from 'prop-types';
import './todoList.css';
import { Todo } from '../Todo';
import { TodoType } from '../../types';

export function TodoList({ todos }) {
  return (
    <div className="todo-list">
      <h2>To Do List:</h2>
      <ol>
        {todos.map(todo => (
          <li key={todo.id}>
            <Todo {...todo} />
          </li>
        ))}
      </ol>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      todo: PropTypes.arrayOf(
        TodoType,
      ),
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
