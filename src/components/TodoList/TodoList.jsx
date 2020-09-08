import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = React.memo(({ todos }) => (
  <ul className="todo__list">
    {
      todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))
    }
  </ul>
));

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
