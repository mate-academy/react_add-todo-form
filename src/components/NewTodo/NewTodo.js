import React from 'react';
import PropTypes from 'prop-types';

export const NewTodo = (
  { addTask,
    handleChange,
    selecteduserId,
    title,
    userId,
    users },
) => (
  <>
    <form onSubmit={addTask}>
      <label htmlFor="search-query" className="label">
        Task
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="search-query"
        className="input"
        maxlenght={50}
        value={title}
        placeholder="Type task"
      />
      <select
        value={userId}
        onChange={selecteduserId}
        className="select"
      >
        <option disabled value="0">Choose a user</option>
        {users.map(user => (
          <option key={user.username} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button
        type="submit"
        className="button"
      >
        Add
      </button>
    </form>
  </>
);

NewTodo.propTypes = {
  addTask: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  selecteduserId: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
