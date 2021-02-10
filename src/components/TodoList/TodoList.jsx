import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

export const TodoList = ({ todosState }) => (
  <ul>
    {todosState.map(todo => (
      <Todo key={todo.id} {...todo} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todosState: PropTypes.arrayOf(PropTypes.any),
};

TodoList.defaultProps = {
  todosState: [],
};
