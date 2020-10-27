import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <div className="User">
    {`Name: ${name}`}
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
