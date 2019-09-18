import React from 'react';
import './NewTodos.css';

import { NewTodosProps } from '../PropTypes/PropTypes';

const NewTodos = ({
  users, handleChangeTitle, handleChangeUser,
  handleClickButton, selectedUser, placeholder, inputTitle,
}) => (
  <div className="todos__form">
    <form>
      <input
        className="form__input"
        type="text"
        placeholder={placeholder}
        onChange={handleChangeTitle}
        value={inputTitle}
      />
      <select
        className="user-select"
        onChange={handleChangeUser}
        value={selectedUser}
      >
        <option selected>Choose a user</option>
        {users.map(user => <option>{user.name}</option>)}
      </select>
      <button
        type="button"
        onClick={handleClickButton}
      >
          Add Todos
      </button>
    </form>
  </div>
);

NewTodos.propTypes = NewTodosProps;

export default NewTodos;
