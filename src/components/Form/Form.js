import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';

function Form({ users, todoAdd }) {
  const [title, setTitle] = useState('');
  const [person, setPerson] = useState('');
  const [error, setError] = useState('');

  const isSubmit = (event) => {
    event.preventDefault();

    if (!title) {
      setError('Please enter the title');

      return;
    }

    if (!person) {
      setError('Please choose a user');

      return;
    }

    if (title && person) {
      todoAdd(title, person);
      setTitle('');
      setPerson('');
      setError('');
    }

    event.target.reset();
  };

  const isChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value.trim());
    } else {
      setPerson(value);
    }

    setError('');
  };

  return (
    <form onSubmit={isSubmit} className="form">
      <p className="error">{error}</p>
      <select className="select-users" name="person" onChange={isChange}>
        <option value="">Please choose a user</option>
        {users.map(user => (
          <option
            key={user.id}
            value={user.name}
          >
            {user.name}
          </option>
        ))}
      </select>
      <div>
        <input
          className="input-todo"
          type="text"
          name="title"
          placeholder="Write your task"
          onChange={isChange}
        />
        <button className="button-submit" type="submit">Add</button>
      </div>

    </form>
  );
}

export default Form;

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  todoAdd: PropTypes.func.isRequired,
};
