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
  <>
    <form onSubmit={onSubmit}>
      <label htmlFor="newTodo">
        Todo:
        {' '}
      </label>
      <textarea
        id="newTodo"
        rows="5"
        cols="45"
        placeholder="Enter Todo"
        value={todoTitle}
        onChange={handleTitle}
        required
      />
      <br />
      <label>
        <select
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
      </label>
      <br />
      <button type="submit">
        Add
      </button>
    </form>
  </>
);

NewTodo.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  todoUserId: PropTypes.number.isRequired,
  handleUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
