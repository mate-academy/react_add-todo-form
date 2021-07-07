import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function Todo({
  title,
  completed,
  user,
  index,
}) {
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{completed ? 'DONE' : 'IN PROGRESS'}</p>
      <User {...user} i={index} />
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default Todo;
