import React from 'react';
import './FormControll.css';

const FormControll = props => {
  const {
    users,
    handleInput,
    handleClick,
    handleSelected,
    textError,
    inputValue,
    selectedUser,
  } = props;

  return (
    <form className="form-add-todo">
      <label htmlFor="title">
        Todo:
        <input
          id="title"
          className="input-title"
          type="text"
          value={inputValue}
          onChange={handleInput}
          placeholder="Input your task"
        />
      </label>

      <label htmlFor="selected-user">
        User:
        <select
          id="selected-user"
          className="selected-user"
          value={selectedUser}
          onChange={handleSelected}
        >
          <option value={0}>Choose a user</option>
          {users.map(user => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
      </label>

      <button
        className="button-add-user"
        type="button"
        onClick={handleClick}
      >
        Add
      </button>
      <p className="error">
        {textError}
      </p>
    </form>
  );
};

export default FormControll;
