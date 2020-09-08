import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = React.memo(({ todos, toggleComplete }) => (
  <ul className="todo__list">
    {
      todos.map(todo => (
        <TodoItem key={todo.id} {...todo} toggleComplete={toggleComplete} />
      ))
    }
  </ul>
));

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
