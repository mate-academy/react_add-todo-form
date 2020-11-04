import React from 'react';

const SelectName = ({ userName, handleChange, users, userNameError }) => (
  <label className="form__input">
    <select
      name="userName"
      value={userName}
      onChange={handleChange}
    >
      <option
        value=""
      >
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
      && <p className="ui red pointing basic label">Please choose a user</p>
    }
  </label>
);

export default SelectName;
