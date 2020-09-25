import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Form = ({
  users,
  userState,
  todoState,
  handleChange,
  handleSubmit,
  userError,
  todoError,
}) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="userState">Select a user</label>
    <select
      name="userState"
      value={userState}
      onChange={handleChange}
    >
      <option value="">Choose a user</option>
      {users.map(user => (
        <option
          key={user.id}
          value={user.name}
        >
          {user.name}
        </option>
      ))}
    </select>
    <div className={classNames(
      'error',
      { visible: userError },
    )}
    >
      Please choose a user
    </div>

    <label htmlFor="userState">Title of todo</label>
    <input
      name="todoState"
      type="text"
      placeholder="Add todo"
      value={todoState}
      onChange={handleChange}
    />
    <div className={classNames(
      'error',
      { visible: todoError },
    )}
    >
      Please enter the title
    </div>
    <button type="submit">Add</button>
  </form>
);

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any),
  userState: PropTypes.string.isRequired,
  todoState: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userError: PropTypes.bool.isRequired,
  todoError: PropTypes.bool.isRequired,
};

Form.defaultProps = {
  users: [],
};
