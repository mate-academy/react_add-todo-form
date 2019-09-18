import React from 'react';
import './NewTodo.css';
import cx from 'classnames';
import { newTodoPropTypes } from '../PropTypes/PropTypes';

const NewTodo = ({
  users, onTitleChange, onUserChange, onSubmitClick,
  inputUser, inputTitle, errorUser, errorTitle,

}) => {
  const inputClass = cx('text-input', { 'text-input-error': !!errorTitle });
  const selectClass = cx('select-input', { 'select-input-error': !!errorUser });

  return (
    <form
      className="form"
      onSubmit={onSubmitClick}
    >
      <div className="wrapper">
        <input
          className={inputClass}
          type="text"
          onChange={onTitleChange}
          value={inputTitle}
          maxLength={30}
          placeholder="Write title of your TODO"
        />
        {errorTitle && <small className="error-msg">{errorTitle}</small>}
      </div>
      <div className="wrapper">
        <select
          value={inputUser}
          className={selectClass}
          type="text"
          name="todo-name"
          onChange={onUserChange}
          placeholder="Write title"
        >
          <option value="">
            Select user
          </option>
          {users.map(value => (
            <option key={value.id} value={value.name}>{value.name}</option>
          ))}
        </select>
        {errorUser && <small className="error-msg">{errorUser}</small>}
      </div>
      <button
        className="submit-button"
        type="submit"
      >
        Add new TODO!
      </button>
    </form>
  );
};

NewTodo.propTypes = newTodoPropTypes;

export default NewTodo;
