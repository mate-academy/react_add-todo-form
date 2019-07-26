import React from 'react';
import PropTypes from 'prop-types';

const User = props => (
  <div>
    {props.user.name}
  </div>
);

User.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default User;
