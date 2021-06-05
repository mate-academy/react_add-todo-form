import React from 'react';
import PropTypes from 'prop-types';

import './About.scss';

export const About = React.memo(({ name, email, phone, address }) => (
  <div className="user">
    <div className="name">
      {name}
    </div>
    <div className="user__about">
      <p className="email">
        <span className="label">email:</span>
        {email}
      </p>
      <p className="phone">
        <span className="label">phone:</span>
        {phone}
      </p>
      <p className="email">
        <span className="label">city:</span>
        {address.city}
      </p>
    </div>
  </div>

));

About.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
};
