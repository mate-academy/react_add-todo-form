import React from 'react';
import PropTypes from 'prop-types';
import { usersShape } from '../PropTypes';
import './Form.css';

export const Form = ({ users, sendForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const newTodo = form.todo.value;
    const selectedUser = form.author.value;
    const error = document.querySelector('.error');

    if (!newTodo) {
      error.textContent = 'Please enter the title';

      return;
    }

    if (!selectedUser) {
      error.textContent = 'Please choose a user';

      return;
    }

    error.textContent = '';

    if (newTodo && selectedUser) {
      sendForm(newTodo, selectedUser);
      form.todo.value = '';
      form.author.value = '';
    }
  };

  const handleChange = () => {
    const error = document.querySelector('.error');

    error.textContent = '';
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <select
        name="author"
        className="select"
        onChange={handleChange}
      >
        <option value="">Please choose a user</option>
        {users.map(user => (
          <option value={user.name}>{user.name}</option>
        ))}
      </select>

      <div className="inputWrapper">
        <input
          type="text"
          className="input"
          name="todo"
          placeholder="Type your todo"
          onChange={handleChange}
        />
        <button className="button" type="submit">Add</button>
      </div>
      <p className="error" />
    </form>
  );
};

Form.propTypes = {
  users: PropTypes.arrayOf(usersShape).isRequired,
  sendForm: PropTypes.func.isRequired,
};
