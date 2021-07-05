import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({ name, id }) => (
  <>
    <span className="id">{id}</span>
    <span className="name">{name}</span>
  </>
);

User.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
