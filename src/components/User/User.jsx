import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ currentUser }) => (
  <td className="table-light">
    {currentUser}
  </td>
);

User.propTypes = {
  currentUser: PropTypes.string.isRequired,
};
