import React from 'react';
import PropTypes from 'prop-types';

function NewTodo({
  onFormSubmit,
  onInputChange,
  onSelectChange,
  usersList,
  selectedUser,
  title,
}) {
  return (
    <form onSubmit={onFormSubmit} className="ui form">
      <input
        type="text"
        onChange={onInputChange}
        placeholder="Add Todo"
        value={title}
      />
      <select
        value={selectedUser}
        onChange={onSelectChange}
        className="ui selection dropdown"
      >
        <option value="">Select a user</option>
        {usersList.map(user => (
          <option>{user.name}</option>
        ))}
      </select>
      <button
        className="ui black basic button"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

NewTodo.PropTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUser: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NewTodo;
