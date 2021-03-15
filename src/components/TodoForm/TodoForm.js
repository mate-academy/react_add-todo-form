import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../../types';

import './TodoForm.css';

export const TodoForm = ({
  title,
  userId,
  users,
  handleChange,
  formSubmitHandler,
}) => (
  <form>
    <label htmlFor="title" className="label">
      <span className="label__text">Title:</span>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Your todo"
        value={title}
        onChange={handleChange}
        className="input"
      />
    </label>

    <br />

    <label htmlFor="user" className="label">
      <span className="label__text">User:</span>
      <select
        name="userId"
        id="user"
        value={userId}
        onChange={handleChange}
        className="input"
      >
        <option
          value=""
        >
          Choose user
        </option>
        {users.map(user => (
          <option
            value={user.id}
            key={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>

    <button
      type="submit"
      onClick={formSubmitHandler}
      className="button"
    >
      Add todo!
    </button>
  </form>
);

TodoForm.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(UserType).isRequired,
  handleChange: PropTypes.func.isRequired,
  formSubmitHandler: PropTypes.func.isRequired,
};
