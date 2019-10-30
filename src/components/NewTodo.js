import React from 'react';
import PropTypes from 'prop-types';

function NewTodo(
  {
    handleSubmit,
    handleTitleChange,
    handleSelectChange,
    users,
    title,
    selectedOption,
  }
) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="todoTitle"
        placeholder="Todo Title"
        onChange={handleTitleChange}
        value={title}
        required
      />
      <select
        required
        name="assignTo"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option>{user.name}</option>
        ))}
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
}

NewTodo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export default NewTodo;
