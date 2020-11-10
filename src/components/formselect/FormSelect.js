import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';

const FormSelect = ({ userName, handleChange, users, userNameError }) => (
  <>
    <select
      name="userName"
      id="userName"
      value={userName}
      onChange={handleChange}
      className="ui compact selection dropdown"
    >
      <option value="">Choose a user</option>
      {users.map(user => (
        <option
          key={user.id}
          value={user.name}
        >
          {user.name}
        </option>
      ))}
    </select>

    {
      userNameError
        ? (
          <span className="ui red pointing basic label">
            Please choose a user
          </span>
        )
        : (
          <label
            className="ui pointing label"
            htmlFor="userName"
          >
            Choose a user
          </label>
        )
    }
  </>
);

FormSelect.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  userName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  userNameError: PropTypes.bool.isRequired,
};

export default FormSelect;
