import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export function User({ user }) {
  return (
    <>
      <p className="user">
        Responsible person:
        {' '}
        <span className="userName">
          {user.name}
        </span>
      </p>
    </>
  );
}

export const prepearedTodosType = {
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

User.propTypes = {
  user: prepearedTodosType.user.isRequired,
};
