import React from 'react';
import PropTypes from 'prop-types';

export const TodoForm = ({
  users,
  title,
  user,
  titleError,
  userError,
  handleChange,
  handleSubmit,
}) => (
  <form className="todoForm" onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <input
      type="text"
      name="title"
      id="title"
      placeholder="Enter the title"
      maxLength="20"
      value={title}
      onChange={handleChange}
    />
    <span className="error" hidden={titleError}>Please enter the title!</span>
    <select
      name="user"
      value={user}
      onChange={handleChange}
    >
      <option value="">
        Choose a user
      </option>
      {users.map(item => (
        <option value={item.name} key={item.id}>{item.name}</option>
      ))}
    </select>
    <span className="error" hidden={userError}>Please choose user!</span>
    <button type="submit">Add todo</button>
  </form>
);

TodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  titleError: PropTypes.bool.isRequired,
  userError: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
