import React from 'react';
import PropTypes from 'prop-types';

function Todo({ user, title, completed }) {
  const text = completed ? 'yes' : 'no';

  return (
    <>
      <td>{user.name}</td>
      <td>{title}</td>
      <td>
        <span className={`${completed
          ? 'completed'
          : 'not-completed'}`}
        >
          {text}
        </span>
      </td>
    </>
  );
}

export default Todo;

Todo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
