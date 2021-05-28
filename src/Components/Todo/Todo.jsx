import React from 'react';
import PropTypes from 'prop-types';

export function Todo({ title, completed, user }) {
  return (
    <div className="todo">
      <h2>{title}</h2>
      <hr />
      <p className="todo__status">
        {`Status: `}
        <span>
          {completed ? 'Completed' : 'Incompleted'}
        </span>
      </p>
      <p className="todo__user">
        {user.name}
      </p>
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
