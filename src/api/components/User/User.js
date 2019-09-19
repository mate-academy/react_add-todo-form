import React from 'react';
import PropTypes from 'prop-types';

const User = ({ person }) => (
  <>
    <div className="card__contact">
      <i className="icon far fa-address-book" />
      Full name:
      <span>{person.name}</span>
    </div>
    <div className="card__email">
      <i className="icon email far fa-envelope" />
      Email:
      {person.email}
    </div>
    <div className="card__phone">
      <i className="icon fas fa-phone-alt" />
      Phone:
      {person.phone}
    </div>
  </>
);

User.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
