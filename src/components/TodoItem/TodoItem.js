import React from 'react';
import PropTypes from 'prop-types';

import User from '../User/User';

function TodoItem(props) {
  const { todo } = props;

  return (
    <div className="todo-item">
      <h2>{todo.title}</h2>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
      <User user={todo.user} />
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TodoItem;
