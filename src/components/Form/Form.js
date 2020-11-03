import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Form.css';

const Form = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [validTitle, setValidTitle] = useState(true);
  const [validPerson, setValidPerson] = useState(true);

  const addTask = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setValidTitle(false);
    }

    if (!userName) {
      setValidPerson(false);
    }

    if (title.trim() && userName) {
      const user = users.find(person => person.name === userName);
      const todo = {
        title,
        userId: user.id,
        user,
        completed: false,
      };

      onAdd(todo);
      setTitle('');
      setUserName('');
    }
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
    setValidTitle(true);
  };

  const changeUser = (event) => {
    setUserName(event.target.value);
    setValidPerson(true);
  };

  return (
    <form
      className="form"
      onSubmit={addTask}
      method="POST"
    >
      <div className="form__input">
        <input
          type="text"
          name="task"
          autoComplete="off"
          placeholder="Enter a new task"
          value={title}
          onChange={changeTitle}
        />
        { !validTitle && (
          <span className="form__error">
            Please enter the title
          </span>
        )}
      </div>
      <div className="form__input">
        <select
          name="name"
          value={userName}
          onChange={changeUser}
          className="form__choose"
        >
          <option value="''">Choose person</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>
        { !validPerson && (
          <span className="form__error">
            Please choose the user
          </span>
        )
        }
      </div>
      <button
        type="submit"
        className="button"
      >
        Add task
      </button>
    </form>
  );
};

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export { Form };
