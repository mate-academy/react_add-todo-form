import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({ data }) => (
  <div>
    <p>
      {data.name}
    </p>
    <p>
      {data.email}
    </p>
  </div>
);

const userShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
}).isRequired;

User.propTypes = {
  data: PropTypes.shape(userShape).isRequired,
};

export default User;
