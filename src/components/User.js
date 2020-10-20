import React from 'react';
import PropTypes from 'prop-types';

export function User(props) {
  return (
    <>
      <span>
        Name:
        {props.name}
      </span>
    </>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};
