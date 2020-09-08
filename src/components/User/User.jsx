import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name, id }) => (
  <div>
    <span className="item__name">{name}</span>
    <span>
      ID -
      {id}
    </span>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
