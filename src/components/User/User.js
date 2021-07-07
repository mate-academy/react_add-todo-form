import React from 'react';
import './User.css';

import PropTypes from 'prop-types';

export const User = ({ user }) => (
  <div>
    {user.name}
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

User.defaultProps = {
  user: {},
};
