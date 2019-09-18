import React from 'react';
import './NewTodo.css';

const NewTodo = ({
  users, onTitleChange, onUserChange, onSubmitClick, inputUser, inputTitle,
}) => (
  <form
    className="form"
    onSubmit={onSubmitClick}
  >
    <input
      className="text-input"
      type="text"
      onChange={onTitleChange}
      value={inputTitle}
      maxLength={30}
      placeholder="Write title of your TODO"
    />
    <select
      value={inputUser}
      className="select-input"
      type="text"
      name="todo-name"
      onChange={onUserChange}
      placeholder="Write title"
    >
      <option value="">
        Select user
      </option>
      {users.map((value, i) => (
        <option key={i} value={value}>{value.name}</option>
      ))}
    </select>
    <button
      className="submit-button"
      type="submit"
    >
      Add new TODO!
    </button>
  </form>
);

export default NewTodo;
