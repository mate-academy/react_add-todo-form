import React from 'react';
import PropTypes from 'prop-types';
import './todo.css';

export function ToDo({ title, completed, user }) {
  return (
    <>
      {title}
      :
      <p>
        {' '}
        {completed === true ? 'done' : 'not done'}
        {' '}
        by
        {' '}
        {user[0]?.name}
        {' '}
      </p>
    </>
  );
}

ToDo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.object.isRequired,
      company: PropTypes.object.isRequired,
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
