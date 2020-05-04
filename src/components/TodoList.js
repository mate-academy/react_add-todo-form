import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

const TodoList = ({ preparedTodos }) => (
  <ul className="list">
    {preparedTodos.map(todo => (
      <Todo {...todo} key={todo.id} />
    ))}
  </ul>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default TodoList;
