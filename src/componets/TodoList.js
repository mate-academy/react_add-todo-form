import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from './Todo';

export const TodoList = ({ todos }) => (
  <div className="todo-list">
    {todos.map(todo => (
      <div key={todo.id}>
        <Todo {...todo} />
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
