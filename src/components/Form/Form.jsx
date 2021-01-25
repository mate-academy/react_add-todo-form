import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usersShape } from '../PropTypes';
import './Form.css';

export const Form = ({ users, sendNewTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoAuthor, setTodoAuthor] = useState('');
  const [errorMessage, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    if (!todoTitle) {
      setError('Please enter the title');

      return;
    }

    if (!todoAuthor) {
      setError('Please choose a user');

      return;
    }

    if (todoTitle && todoAuthor) {
      sendNewTodo(todoTitle, todoAuthor);
      setTodoTitle('');
      setTodoAuthor('');
      setError('');
    }

    form.reset();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'todoTitle') {
      setTodoTitle(value.trim());
    } else {
      setTodoAuthor(value);
    }

    setError('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <select
        name="todoAuthor"
        className="select"
        onChange={handleChange}
      >
        <option value="">Please choose a user</option>
        {users.map(user => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>

      <div className="inputWrapper">
        <input
          type="text"
          className="input"
          name="todoTitle"
          placeholder="Type your todo"
          onChange={handleChange}
        />
        <button className="button" type="submit">Add</button>
      </div>
      <p className="error">{errorMessage}</p>
    </form>
  );
};

Form.propTypes = {
  users: PropTypes.arrayOf(usersShape).isRequired,
  sendNewTodo: PropTypes.func.isRequired,
};
