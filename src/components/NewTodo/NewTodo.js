import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export const NewTodo = (
  { todoTitle,
    handleTitle,
    todoUserId,
    handleUser,
    onSubmit },
) => (
  <form className="NewTodo" onSubmit={onSubmit}>
    <label htmlFor="newTodo">
      Todo:
    </label>
    <br />
    <textarea
      className="NewTodo__title"
      id="newTodo"
      rows="5"
      cols="50"
      placeholder="Enter Todo"
      value={todoTitle}
      onChange={handleTitle}
      required
    />
    <br />
    <select
      className="NewTodo__select"
      value={todoUserId}
      onChange={handleUser}
      required
    >
      <option value="" hidden>Select User</option>
      {users.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
    <br />
    <button className="NewTodo__btn" type="submit">
      Add
    </button>
  </form>
);

NewTodo.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  todoUserId: PropTypes.number.isRequired,
  handleUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
