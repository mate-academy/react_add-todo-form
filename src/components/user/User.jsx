import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <div>
    <b>Name: </b>
    {`${name}`}
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
