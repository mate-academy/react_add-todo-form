import React from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';

const AddTodo = ({
  inputValue,
  listOfUsers,
  handleInputChange,
  selectedUser,
  changeSelectedUser,
  addTodo,
  showErrorInput,
  showErrorSelect,
}) => (
  <>
    <form>
      <div className="element-of-form">
        <label htmlFor="title">
          Todo:
          {' '}
          <input
            type="text"
            value={inputValue}
            onChange={e => handleInputChange(e.target.value)}
            maxLength={30}
            id="title"
          />
        </label>
        {showErrorInput && (
          <p className="error">Please enter the title</p>
        )}
      </div>

      <div className="element-of-form">
        <label htmlFor="user">
          User:
          {' '}
          <select
            value={selectedUser}
            onChange={event => changeSelectedUser(event.target.value)}
            id="user"
          >
            <option value={0}>Choose a user</option>
            {listOfUsers.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        {showErrorSelect && (
          <p className="error">Please choose a user</p>
        )}
      </div>

      <button
        className="element-of-form"
        type="button"
        onClick={addTodo}
      >
        Add Todo
      </button>
    </form>
  </>
);

AddTodo.propTypes = {
  inputValue: PropTypes.string.isRequired,
  listOfUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
  changeSelectedUser: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  showErrorInput: PropTypes.func.isRequired,
  showErrorSelect: PropTypes.func.isRequired,
};

export default AddTodo;
