import React from 'react';
import classNames from 'classnames';
import './SelectUser.css';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';
import { StateShape } from '../shapes/StateShape';

export const SelectUser = ({ state, dispatch, users }) => {
  const { selectedUserId, selectWarnMessage } = state;

  const selectClasses = classNames('SelectUser', {
    Error: selectWarnMessage,
  });

  const selectUser = (event) => {
    const selectedUser = event.target.value;

    dispatch({
      type: 'SELECT_USER', payload: Number(selectedUser),
    });
  };

  return (
    <>
      <select
        name="selectUser"
        className={selectClasses}
        value={selectedUserId}
        onChange={selectUser}
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
      <div className="selectWarnMessage">{selectWarnMessage}</div>
    </>
  );
};

SelectUser.propTypes = {
  state: PropTypes.shape(StateShape).isRequired,
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
};
