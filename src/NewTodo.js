import React from 'react';
import PropTypes from 'prop-types';

const NewTodo = ({
  users,
  addTodo,
  inputValue,
  selectedValue,
  inputChange,
  selectChange,
  titleError,
  userError,
}) => (
  <div>
      Title:
    {' '}
    <input
      type="text"
      value={inputValue}
      onChange={(event) => {
        inputChange(event);
      }}
    />
    <span className="error">{titleError}</span>
    <br />
      User:
    {' '}
    <select
      value={selectedValue}
      onChange={(event) => {
        selectChange(event);
      }}
    >
      <option value="" />
      {users.map(user => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.id}
            .
          {user.name}
        </option>
      ))
      }
    </select>
    <span className="error">{userError}</span>
    <br />
    <button
      type="button"
      onClick={addTodo}
    >
        Add todo to list
    </button>
  </div>
);

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  inputChange: PropTypes.func.isRequired,
  selectChange: PropTypes.func.isRequired,
  titleError: PropTypes.string.isRequired,
  userError: PropTypes.string.isRequired,
};

export default NewTodo;
