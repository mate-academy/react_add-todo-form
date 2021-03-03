import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

export const TodoForm = ({
  selectValue,
  select,
  inputValue,
  changeValue,
  add,
  users,
}) => (
  <div className="TodoForm">
    <label htmlFor="select">
      <select
        id="select"
        value={selectValue}
        onChange={select}
      >
        <option>Choose a user</option>
        {[...users].map(user => (
          <option key={user.id}>{user.name}</option>
        ))}
      </select>
    </label>

    <label htmlFor="input">
      <input
        id="input"
        type="text"
        placeholder="Add new Todo"
        value={inputValue}
        onChange={changeValue}
      />
    </label>

    <label htmlFor="button">
      <button id="button" type="submit" onClick={add}>Add</button>
    </label>
  </div>
);

TodoForm.propTypes = {
  selectValue: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
