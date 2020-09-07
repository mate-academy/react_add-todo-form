import React from 'react';

import PropTypes from 'prop-types';

export const User = ({ name, id }) => (
  <p>{`${name} id is ${id}`}</p>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
