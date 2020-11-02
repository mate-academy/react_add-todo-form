import React from 'react';
import classNames from 'classnames';
import './SelectUser.css';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';
import { StateShape } from '../shapes/StateShape';
import { Options } from '../Options/Options';

import { actionTypes } from '../../reducer';

export const SelectUser = ({ state, dispatch, users }) => {
  const { selectedUserId, selectWarnMessage } = state;
  const { selectUserType } = actionTypes;

  const selectClasses = classNames('SelectUser', {
    Error: selectWarnMessage,
  });

  const selectUser = (event) => {
    const selectedUser = event.target.value;

    dispatch({
      type: selectUserType, payload: Number(selectedUser),
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
        <Options users={users} />
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
