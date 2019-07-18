import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name }) => (
  <div>
    {name}
  </div>
);

User.propTypes = {
  name: PropTypes.string,
};

User.defaultProps = {
  name: null,
};

export default User;
