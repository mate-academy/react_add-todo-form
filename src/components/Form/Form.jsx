import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../types/types';

export const Form = ({
  title,
  selectedUserId,
  users,
  handleChange,
  handleSelect,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="title"
      value={title}
      onChange={handleChange}
    />
    <select
      value={selectedUserId}
      onChange={handleSelect}
    >
      <option>
        Choice user
      </option>
      {users.map(user => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
    <button type="submit">
      Submit
    </button>
  </form>
);

Form.propTypes = {
  title: PropTypes.string.isRequired,
  selectedUserId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  users: UserType.isRequired,
};
