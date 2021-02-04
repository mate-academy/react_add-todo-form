import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <ol className="list">
    {todos.map(todo => (

      <Todo
        key={todo.id}
        {...todo}
      />
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
