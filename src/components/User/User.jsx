import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ userId, userName }) => (
  <p className="todo-list__item-user" data-user_id={userId}>
    User name:
    {` ${userName}`}
  </p>
);

User.propTypes = {
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
};
