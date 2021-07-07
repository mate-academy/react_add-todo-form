import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import TodoList from '../TodoList';
import Todo from '../Todo';

function Form({ users, todos }) {
  const [todoList, setTodoList] = useState(todos);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentUser, setCurrentUser] = useState('Select user');

  function handleSubmit() {
    if (inputValue.trim().length === 0) {
      setError('Please enter your task');
    } else if (currentUser === 'Select user') {
      setError('Please select user');
    } else {
      const actualUser = users.find(user => user.name === currentUser);

      setTodoList(
        [...todoList,
          {
            title: inputValue,
            user: actualUser,
            userId: actualUser.id,
            completed: false,
            id: todoList.length + 1,
          }],
      );
      setInputValue('');
    }
  }

  function handleInputChange(target) {
    setInputValue(target.value);
    hideError();
  }

  function handleSelectChange(target) {
    setCurrentUser(target.value);
    hideError();
  }

  function hideError() {
    setError('');
  }

  return (
    <div className="Form">
      <div className="Form__container">
        <p className="Form__error">{error}</p>
        <label htmlFor="taskInput">Choose task</label>
        <label htmlFor="user-select">Choose user</label>
        <span />
        <input
          type="text"
          placeholder="Type your task here"
          id="taskInput"
          className="Form__task-input"
          maxLength={30}
          onChange={event => handleInputChange(event.target)}
          value={inputValue}
        />
        <select
          className="Form__select-user"
          onChange={event => handleSelectChange(event.target)}
          id="user-select"
        >
          <option key="none">Select user</option>
          {users.map(user => (
            <option key={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="Form__btn-add"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
      <TodoList todos={todoList} />
    </div>
  );
}

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  todos: PropTypes.arrayOf(Todo.propTypes).isRequired,
};

export default Form;
