import React from 'react';
import './NewTodos.css';

import { NewTodosProps } from '../PropTypes/PropTypes';

const NewTodos = ({ users, handleChangeTitle, handleClickbutton }) => (
  <div className="todos__form">
    <form>
      <input
        className="form__input"
        type="text"
        placeholder="Enter the title for TODO"
        onChange={handleChangeTitle}
      />
      <select
        className="user-select"
        onChange={() => {}}
        name="userSelect"
        value={() => {}}
      >
        {users.map(user => <option>{user.name}</option>)}
      </select>
      <button
        type="button"
        onClick={handleClickbutton}
      >
        Add TODOS
      </button>
    </form>
  </div>
);

NewTodos.propTypes = NewTodosProps;

export default NewTodos;
