import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({ type }) => {
  if (type === 'user') {
    return <div className="error error--user">Please choose a user</div>;
  }

  return <div className="error error--title">Please enter the title</div>;
};

Error.propTypes = {
  type: PropTypes.string.isRequired,
};
