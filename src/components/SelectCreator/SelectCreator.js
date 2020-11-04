import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../../shapes/UserShape';

export const SelectCreator = (
  { handleChange, userName, users, userNameError },
) => (
  <>
    <label
      className="TodoForm__label"
      htmlFor="userName"
    >
      Choose a user
    </label>

    <select
      name="userName"
      id="userName"
      value={userName}
      onChange={handleChange}
      className="TodoForm__field"
    >
      <option>Choose a user</option>
      {users.map(user => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      ))}
    </select>

    {
      userNameError
        ? <span className="TodoForm__error">Please choose a user</span>
        : ''
    }
  </>
);

SelectCreator.propTypes = PropTypes.shape({
  handleSelect: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userNameError: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(UserShape).isRequired,
}).isRequired;
