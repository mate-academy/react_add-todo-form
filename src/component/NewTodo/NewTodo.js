import React from 'react';

import PropTypes from 'prop-types';

import './NewTodo.css';

const NewTodo = ({
  users,
  selectedUserId,
  newTodoText,
  setSelectedUser,
  setTodoText,
  setNewTodo,
  giveError,
  errorNewTodo,
  selectedUser,
}) => (
  <form className="newtodo-form">
    <label>
      <p className="newtodo-title">ToDo:</p>
      <input
        className="newtodo-text"
        maxLength="50"
        placeholder="Enter ToDo"
        type="text"
        value={newTodoText}
        onChange={event => setTodoText(event.target)}
      />
      {errorNewTodo === 'Please enter the title'
      && (
        <p className="newtodo-error newtodo-error_title">
          {errorNewTodo}
        </p>
      )}

    </label>
    <select
      className="newtodo-user"
      value={selectedUser}
      onChange={event => setSelectedUser(event.target)}
    >
      <option value={selectedUserId}>{selectedUserId}</option>
      {
        users.map(user => (
          <option key={user.id} value={user.name}>{user.name}</option>
        ))
      }
    </select>
    {errorNewTodo === 'Please choose a user'
      && (
        <p className="newtodo-error newtodo-error_user">
          {errorNewTodo}
        </p>
      )}

    <button
      className="newtodo-add"
      type="button"
      onClick={
        selectedUserId === 'Choose a user'
        || newTodoText === ''
          ? giveError
          : setNewTodo
      }
    >
      Add
    </button>
  </form>
);

NewTodo.propTypes = {
  selectedUserId: PropTypes.string.isRequired,
  newTodoText: PropTypes.string.isRequired,
  selectedUser: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  setTodoText: PropTypes.func.isRequired,
  setNewTodo: PropTypes.func.isRequired,
  giveError: PropTypes.func.isRequired,
  errorNewTodo: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
}

export default NewTodo;
