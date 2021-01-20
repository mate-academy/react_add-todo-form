import React from 'react';
import PropTypes from 'prop-types';

function Todo({ user, title, completed }) {
  return (
    <>
      <td>{user.name}</td>
      <td>{title}</td>
      <td>
        { completed
          ? <span style={{ color: 'green' }}>yes</span>
          : <span style={{ color: 'red' }}>no</span> }
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
