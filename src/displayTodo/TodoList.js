import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ list, setCompleted }) => (
  <ul>
    {[...list].map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        setCompleted={setCompleted}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  setCompleted: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
