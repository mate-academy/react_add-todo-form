import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userData: { name } }) => (
  <td>
    {name}
  </td>
);

User.propTypes = { userData: PropTypes.arrayOf(PropTypes.object).isRequired };

export default User;
