import React from 'react';
import PropTypes from 'prop-types';

const NewTodo = ({ users, newText, handleText, setUser, error }) => (
  <>
    <input
      type="text"
      value={newText}
      onChange={handleText}
      className="todo__input"
      placeholder="New TODO"
    />
    <span className="todo__text">
      Select User
    </span>
    <select
      onChange={setUser}
      className="todo__users"
    >
      <option value="">
        {''}
      </option>
      {users.map(user => (
        <option
          key={user.name}
          value={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
    <span className="todo__error">
      {error}
    </span>
    <input
      type="submit"
      value="Add"
      className="todo__button"
    />
  </>
);

NewTodo.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  newText: PropTypes.string.isRequired,
  handleText: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default NewTodo;
