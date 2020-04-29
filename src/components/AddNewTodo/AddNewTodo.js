import React from 'react';
import PropTypes from 'prop-types';

import './AddNewTodo.css';

export const AddNewTodo = (
  { users,
    handlSubmit,
    titleOfTodo, handleTitleOfTodo,
    userId, handlePerformer,
    completed, handleCompleted },
) => (
  <form
    className="AddNewTodo"
    onSubmit={handlSubmit}
  >
    <label>
      Title of todo:
      <input
        type="text"
        maxLength="30"
        value={titleOfTodo}
        onChange={handleTitleOfTodo}
        required
      />
    </label>
    <br />

    <label>
      Performer:
      <select
        value={userId}
        onChange={handlePerformer}
        required
      >
        <option value="" hidden>Choose a user</option>
        {users.map(user => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>
    <br />

    <label>
      Completed:
      <select
        value={completed}
        onChange={handleCompleted}
      >
        <option
          value="No"
        >
          No
        </option>
        <option
          value="Yes"
        >
          Yes
        </option>
      </select>
    </label>
    <br />

    <button
      type="submit"
    >
      Add
    </button>
  </form>
);

AddNewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlSubmit: PropTypes.func.isRequired,
  titleOfTodo: PropTypes.string.isRequired,
  handleTitleOfTodo: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  handlePerformer: PropTypes.func.isRequired,
  completed: PropTypes.string.isRequired,
  handleCompleted: PropTypes.func.isRequired,
};
