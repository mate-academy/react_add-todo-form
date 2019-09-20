import React from 'react';
import PropTypes from 'prop-types';

const UserCounter = ({ users }) => (
  <p>
    <button type="button" className="btn btn-primary">
      <span className="mr-2">Users</span>
      <span className="badge badge-light">
        {users.length}
      </span>
    </button>
  </p>
);

UserCounter.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,).isRequired,
};
export default UserCounter;
