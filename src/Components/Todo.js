import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function Todo({ title, completed, user }) {
  return (
    <>
      <td className="table__item">
        <User user={user} />
      </td>
      <td className="table__item">
        {title}
      </td>
      <td className="table__item">
        {completed ? 'Ready' : 'Not completed'}
      </td>
    </>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Todo;
