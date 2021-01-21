import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import { TypeUser } from '../../types';

export const UsersList = ({ users, handle, selectedUserId }) => (
  <select
    name="selectedUserId"
    value={selectedUserId}
    onChange={handle}
  >
    <option value="">
      Choose a user
    </option>

    {users.map(user => (
      <User {...user} key={user.id} />
    ))}

  </select>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(TypeUser).isRequired,
  handle: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
