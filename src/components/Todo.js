import React from 'react';
import PropTypes from 'prop-types';

function Todo({ title, completed, userId }) {
  return (
    <>
      <p>
        {'UserId: '}
        {userId}
      </p>
      <p>{title}</p>
      <p>{completed ? 'true' : 'false'}</p>
    </>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
}.isRequired;

export default Todo;
