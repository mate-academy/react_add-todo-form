import React from 'react';
import PropTypes from 'prop-types';
import './FormTodo.css';

const FormTodo = ({
  users,
  handleInput,
  handleClick,
  handleSelect,
  userSelect,
  todoTitle,
  userError,
  selectError,
}) => (
  <>
    <div className="formtodo">
      <div className="ui focus input">
        <input
          name="title"
          value={todoTitle}
          type="text"
          placeholder="Write thing you need to do"
          onChange={handleInput}
        />
        {userError === 'Invalid' && (
          <div style={{ color: 'red', fontSize: 13, paddingLeft: 5 }}>
            {userError}
          </div>
        )}
      </div>
      <select value={userSelect} onChange={handleSelect}>
        <option value="" selected disabled hidden>
          Choose here
        </option>
        {users.map(user => (
          <option value={user.name}>{user.name}</option>
        ))}
      </select>
      {selectError && (
        <div style={{ color: 'red', fontSize: 13, paddingLeft: 5 }}>
          {selectError}
        </div>
      )}
      <button
        type="button"
        className="ui primary button add-button"
        onClick={handleClick}
      >
        Add
      </button>
    </div>
  </>
);

FormTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  userSelect: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  userError: PropTypes.string.isRequired,
  selectError: PropTypes.string.isRequired,
};

export default FormTodo;
