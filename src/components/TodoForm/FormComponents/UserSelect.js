import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../../../shapes/UserShape';

export const UserSelect = ({
  userName,
  userNameError,
  handleChange,
  users,
}) => (
  <div className="form__user">
    <select
      name="userName"
      value={userName}
      onChange={handleChange}
      className="form__select"
    >
      <option value="">
        Choose name
      </option>
      {
        users.map(user => (
          <option value={user.name} key={user.id}>
            {user.name}
          </option>
        ))
      }
    </select>
    {userNameError
      && <p className="form__error">Please choose a user</p>}
  </div>
);

UserSelect.propTypes = {
  userName: PropTypes.string.isRequired,
  userNameError: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
};
