import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import TodoList from '../TodoList';
import Todo from '../Todo';

function Form({ users, todos }) {
  const [todoList, setTodoList] = useState(todos);

  function handleInput() {
    const { value } = document.querySelector('.Form__task-input');
    const userName = document.querySelector('.Form__select-user').value;
    const errorForm = document.querySelector('.Form__error');

    if (value.length !== 0 && userName !== 'Select user') {
      const actualUser = users.find(user => user.name === userName);

      errorForm.style.display = 'none';
      setTodoList(
        [...todoList,
          {
            title: value,
            user: actualUser,
            userId: actualUser.id,
            completed: false,
            id: todoList.length + 1,
          }],
      );
    } else {
      errorForm.style.display = 'block';
    }
  }

  function hideError() {
    const errorForm = document.querySelector('.Form__error');

    errorForm.style.display = 'none';
  }

  return (
    <div className="Form">
      <div className="Form__container">
        <p className="Form__error">Task and User fields should not be empty</p>
        <input
          type="text"
          placeholder="Type your task here"
          id="taskInput"
          className="Form__task-input"
          maxLength={30}
          onChange={hideError}
        />
        <select className="Form__select-user">
          <option key="none">Select user</option>
          {users.map(user => <option key={user.name}>{user.name}</option>)}
        </select>
        <button
          type="button"
          className="Form__btn-add"
          onClick={handleInput}
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
