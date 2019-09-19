import React from 'react';
import './NewTodos.css';

import { NewTodosProps } from '../PropTypes/PropTypes';

const NewTodos = ({
  inputTitle, selectedUser, errorTitle, errorUser, users, handleSubmit,
  handleChangeTitle, handleChangeUser,
}) => (
  <div className="todos__form">
    <form
      className="ui form"
      onSubmit={handleSubmit}
    >
      <h2>Form for user add</h2>
      <div className="field">
        <input
          className="form__input"
          type="text"
          onChange={handleChangeTitle}
          value={inputTitle}
          placeholder="Enter the title for TODO"
        />
        {errorTitle && <small className="error">{errorTitle}</small>}
      </div>
      <div className="field">
        <select
          className="user-select ui fluid dropdown"
          onChange={handleChangeUser}
          value={selectedUser}
        >
          <option selected>Choose a user</option>
          {users.map(user => <option>{user.name}</option>)}
        </select>
        {errorUser && <span className="error">{errorUser}</span>}
      </div>
      <button
        type="submit"
        className="ui button"
      >
        Add Todos
      </button>
    </form>
  </div>
);

NewTodos.propTypes = NewTodosProps;

export default NewTodos;
