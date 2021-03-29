import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ userName }) => (
  <p className="user__name">
    <strong>
      {userName}
    </strong>
  </p>
);

User.propTypes = {
  userName: PropTypes.string,
};

User.defaultProps = {
  userName: 'Anonymous',
};
