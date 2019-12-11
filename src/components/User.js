import React from 'react';
import PropTypes from 'prop-types';

export default function User(props) {
  return (
    <td>{props.user.email}</td>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};
