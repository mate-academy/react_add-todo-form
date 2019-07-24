import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const TodoItem = ({ todo }) => (
  <form>
    <label htmlFor={`todo-status-${todo.id}`}>
      <input
        readOnly
        type="checkbox"
        id={`todo-status-${todo.id}`}
        checked={todo.completed}
      />
      {todo.title}
    </label>

    <User user={todo.user} />
  </form>
);

TodoItem.prototypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool,
    title: PropTypes.string,
    user: PropTypes.object,
    id: PropTypes.number,
  }).isRequired,
};

export default TodoItem;
