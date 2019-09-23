import React from 'react';
import PropTypes from 'prop-types';

const User = ({ person }) => (
  <>
    <div>
      Full name:
      <span>{person.name}</span>
    </div>
    <div>
      Email:
      {person.email}
    </div>
    <div>
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
