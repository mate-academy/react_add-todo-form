import React from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';

const AddTodo = ({
  addTodo,
  handleInputChange,
  listOfUsers,
  title,
  selectedUser,
}) => (
  <form>
    <div className="element-of-form">
      <label htmlFor="title">
        Todo:
        {' '}
        <input
          type="text"
          value={title.value}
          onChange={e => handleInputChange(e.target)}
          maxLength={30}
          name="title"
          id="title"
        />
      </label>
      {title.showError && (
        <p className="error">Please enter the title</p>
      )}
    </div>

    <div className="element-of-form">
      <label htmlFor="user">
        User:
        {' '}
        <select
          value={selectedUser.value}
          name="selectedUser"
          onChange={e => handleInputChange(e.target)}
          id="user"
        >
          <option value={0}>Choose a user</option>
          {listOfUsers.map(user => (
            <option value={`${user.id}`}>{user.name}</option>
          ))}
        </select>
      </label>
      {selectedUser.showError && (
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
);

AddTodo.propTypes = {
  listOfUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  selectedUser: PropTypes.shape({
    value: PropTypes.string,
    showError: PropTypes.bool,
  }).isRequired,
  title: PropTypes.shape({
    value: PropTypes.string,
    showError: PropTypes.bool,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
