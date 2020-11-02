import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <div className="App__name">
    {`Name: ${name}`}
  </div>
);

User.propTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
}).isRequired;
