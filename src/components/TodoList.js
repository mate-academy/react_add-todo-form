import React from 'react';
import PropTypes, { object } from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, toggleComplete }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <TodoItem todo={todo} toggleComplete={toggleComplete} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
