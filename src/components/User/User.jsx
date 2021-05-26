import React from 'react';
import PropTypes from 'prop-types';

import './User.scss';

const User = function({ name }) {
  return (
    <p className="userName">
      {`Name: ${name}`}
    </p>
  );
};

User.propTypes = {
  name: PropTypes.string,
};

User.defaultProps = {
  name: 'Name is undefined',
};

export default User;
