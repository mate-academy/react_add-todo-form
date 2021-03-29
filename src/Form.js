import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({
  users,
  onSubmit,
  title,
  onInputChange,
  onSelectChange,
  selectedUserName,
}) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={title}
      onChange={onInputChange}
    />
    <select
      value={selectedUserName}
      onChange={onSelectChange}
    >
      <option>
        Choose User
      </option>
      {users.map(user => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
    <button
      type="submit"
    >
      Add
    </button>
  </form>
);

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,

  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  selectedUserName: PropTypes.string.isRequired,
};
