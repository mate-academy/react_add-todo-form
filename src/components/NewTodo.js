import React from 'react';
import PropTypes from 'prop-types';

export function NewTodo(props) {
  const {
    handleInputChange,
    handleFormSubmit,
    handleSelectChange,
    users,
    selectedUser,
    title,
  } = props;

  return (
    <form onSubmit={handleFormSubmit} className="todo-list__form">
      <input
        type="text"
        onChange={handleInputChange}
        value={title}
        placeholder="Add new todo"
        className="todo-list__input"
      />
      <select
        className="todo-list__select"
        value={selectedUser}
        onChange={handleSelectChange}
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option>{user.name}</option>
        ))}
      </select>
      <button
        className="todo-list__submit"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

NewTodo.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUser: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
