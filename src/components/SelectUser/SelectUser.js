import React from 'react';
import './SelectUser.css';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';

export const SelectUser = (props) => {
  const { selectedUserId, selectUser, users, selectWarnMessage } = props;

  return (
    <select
      name="selectUser"
      className={
        selectWarnMessage
          ? 'SelectUser Error'
          : 'SelectUser'
      }
      value={selectedUserId}
      onChange={e => selectUser(e.target.value)}
    >
      <option value={0}>Choose a User</option>
      {
        users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))
      }
    </select>
  );
};

SelectUser.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
  selectWarnMessage: PropTypes.string.isRequired,
};
