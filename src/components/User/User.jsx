import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name, website }) => (
  <div>
    <div>
      {name}
    </div>
    <div>
      {website}
    </div>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};
