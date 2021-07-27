import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import users from '../../api/users';

export const Form = ({ handleSubmit, onChange, selectedUser }) => (
  <form onSubmit={handleSubmit}>
    <label>
      <input
        name="toDo"
        required
        placeholder="Title"
        maxLength="20"
        onChange={onChange}
      />
    </label>
    <select
      required
      name="selectedUser"
      value={selectedUser}
      onChange={onChange}
    >
      <option value="">
        Choose a user
      </option>
      {users.map(user => (
        <option
          key={nanoid()}
          value={user.name}
        >
          {user.name}
        </option>
      ))
      }
    </select>

    <button type="submit">Submit</button>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedUser: PropTypes.string.isRequired,
};
