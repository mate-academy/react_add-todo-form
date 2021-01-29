import React from 'react';
import PropTypes from 'prop-types';
import './todo.css';

export function Todo({ title, completed, user }) {
  return (
    <>
      <p>
        {`${title}: `}
        <span>
          {`${completed === true ? 'done' : 'not done'} by ${user[0]?.name}`}
        </span>
      </p>
    </>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
