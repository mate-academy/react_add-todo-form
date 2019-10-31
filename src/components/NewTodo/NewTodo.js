import React from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

function NewTodo(props) {
  return (
    <form className="new-todo" onSubmit={props.handleSubmit}>
      <label htmlFor="name-input" className="name-label">
          Title:
        <input
          className="name-input"
          onChange={props.handleInputChange}
          value={props.inputValue}
          name="name-input"
          type="text"
          placeholder="Enter todo title here"
        />
        {props.inputError
          && (
            <span className="error">
              {props.inputError}
            </span>
          )}

      </label>
      <label htmlFor="select" className="select-label">
          User:
        <select
          className="user-select"
          name="select"
          onChange={props.handleSelectChange}
          value={props.selectValue}
        >
          <option>Choose a user</option>
          {
            props.users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))
          }
        </select>
        {props.selectError
          && (
            <span className="error">
              {props.selectError}
            </span>
          )}
      </label>

      <button type="submit" className="submit-button">Add</button>
    </form>
  );
}

NewTodo.defaultProps = {
  handleSubmit: {},
  handleInputChange: {},
  handleSelectChange: {},
  inputValue: '',
  selectValue: -1,
  inputError: null,
  selectError: null,
  users: [],
};

NewTodo.propTypes = {
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  inputValue: PropTypes.string,
  selectValue: PropTypes.number,
  inputError: PropTypes.string,
  selectError: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
};

export default NewTodo;
