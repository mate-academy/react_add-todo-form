import React from 'react';
import PropTypes from 'prop-types';

export const NewTodo = ({
  users,
  addTask,
  currentTask,
  currentUserId,
  handleUserChange,
  handleTaskChange,
}) => (
  <>
    <input
      type="text"
      value={currentTask}
      onChange={handleTaskChange}
      placeholder="Your task"
    />

    <select onChange={handleUserChange} value={currentUserId}>
      <option value={0} disabled> Choose user</option>
      {users.map(user => (
        <option key={user.name} value={user.id}>{user.name}</option>
      ))}
    </select>

    <button type="button" onClick={addTask}>Add Task</button>
  </>
);

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTask: PropTypes.func.isRequired,
  currentTask: PropTypes.string.isRequired,
  currentUserId: PropTypes.number.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handleTaskChange: PropTypes.func.isRequired,
};
