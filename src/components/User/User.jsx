import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

export function User({ name }) {
  return (
    <div className="user">
      <span className="user-name">{name}</span>
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};
